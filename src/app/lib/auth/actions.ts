import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { authConfig } from './config';
import User from '@/app/models/User';
import dbConnect from '@/app/lib/db/connect';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

export async function createSession(userId: string) {
  const token = jwt.sign({ userId }, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.expiresIn,
  });

  cookies().set({
    name: authConfig.cookies.sessionToken.name,
    value: token,
    ...authConfig.cookies.sessionToken.options,
  });

  return token;
}

export async function destroySession() {
  (await cookies()).delete(authConfig.cookies.sessionToken.name);
}

export async function getSession() {
  const token = (await cookies()).get(authConfig.cookies.sessionToken.name)?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as { userId: string };
    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}

export async function verifyCredentials(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email, provider: 'credentials' });

  if (!user || !user.password) return null;

  const isValid = await user.comparePassword(password);
  if (!isValid) return null;

  return user;
}

export async function verifyGoogleToken(token: string) {
  const client = new OAuth2Client(authConfig.providers.google.clientId);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: authConfig.providers.google.clientId,
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid Google token');

  return {
    name: payload.name || payload.email?.split('@')[0] || 'User',
    email: payload.email as string,
    image: payload.picture,
    provider: 'google' as const,
    providerId: payload.sub,
  };
}

export async function getGithubProfile(code: string) {
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: authConfig.providers.github.clientId,
        client_secret: authConfig.providers.github.clientSecret,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user profile
    const profileResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    // Get user emails
    const emailsResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const primaryEmail = emailsResponse.data.find(
      (email: any) => email.primary
    )?.email;

    if (!primaryEmail) throw new Error('Could not get email from GitHub');

    return {
      name: profileResponse.data.name || profileResponse.data.login,
      email: primaryEmail,
      image: profileResponse.data.avatar_url,
      provider: 'github' as const,
      providerId: profileResponse.data.id.toString(),
    };
  } catch (error) {
    throw new Error('GitHub authentication failed');
  }
}

export async function findOrCreateUser(profile: {
  name: string;
  email: string;
  image?: string;
  provider: 'google' | 'github';
  providerId: string;
}) {
  await dbConnect();

  let user = await User.findOne({
    provider: profile.provider,
    providerId: profile.providerId,
  });

  if (!user) {
    // Check if email is already registered
    const existingUser = await User.findOne({ email: profile.email });
    if (existingUser) {
      throw new Error('Email already registered with another provider');
    }

    user = await User.create({
      name: profile.name,
      email: profile.email,
      image: profile.image,
      provider: profile.provider,
      providerId: profile.providerId,
      emailVerified: true,
    });
  }

  return user;
}