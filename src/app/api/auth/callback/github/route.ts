import { NextResponse } from 'next/server';
import { getGithubProfile, findOrCreateUser, createSession } from '@/app/lib/auth/actions';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      throw new Error('No code provided');
    }

    const profile = await getGithubProfile(code);
    const user = await findOrCreateUser(profile);
    await createSession(user._id.toString());

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error: any) {
    return NextResponse.redirect(
      new URL(`/login?error=${error.message}`, request.url)
    );
  }
}