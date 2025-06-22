import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import dbConnect from '@/app/lib/db/connect';
import { createSession } from '@/app/lib/auth/actions';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      provider: 'credentials',
    });

    await createSession(user._id.toString());
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}