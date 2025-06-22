import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { authConfig } from '@/app/lib/auth/config';
import { findOrCreateUser, createSession } from '@/app/lib/auth/actions';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            throw new Error(error);
        }

        if (!code) {
            throw new Error('No code provided');
        }

        const client = new OAuth2Client(
            authConfig.providers.google.clientId,
            authConfig.providers.google.clientSecret,
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`
        );

        const { tokens } = await client.getToken(code);
        if (!tokens.id_token) {
            throw new Error('No ID token received from Google');
        }

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: authConfig.providers.google.clientId,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Could not verify Google token');
        }

        const user = await findOrCreateUser({
            name: payload.name || payload.email?.split('@')[0] || 'User',
            email: payload.email as string,
            image: payload.picture,
            provider: 'google',
            providerId: payload.sub,
        });

        await createSession(user._id.toString());

        return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (err: any) {
        console.error('Google callback error:', err);
        return NextResponse.redirect(
            new URL(`/login?error=${err.message}`, request.url)
        );
    }
}

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        const client = new OAuth2Client(authConfig.providers.google.clientId);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: authConfig.providers.google.clientId,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid Google token' },
                { status: 401 }
            );
        }

        const user = await findOrCreateUser({
            name: payload.name || payload.email?.split('@')[0] || 'User',
            email: payload.email as string,
            image: payload.picture,
            provider: 'google',
            providerId: payload.sub,
        });

        await createSession(user._id.toString());

        return NextResponse.json({
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                image: user.image,
                provider: user.provider,
            },
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Google authentication failed' },
            { status: 500 }
        );
    }
}