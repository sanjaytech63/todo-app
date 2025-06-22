import { NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/app/lib/auth/actions';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await createSession(user._id.toString());
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}