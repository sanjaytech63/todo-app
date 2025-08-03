import { NextResponse } from 'next/server';
import { signAccessToken, signRefreshToken } from '@/app/lib/jwt';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/models/User';
import { serialize } from 'cookie';

interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RegisterBody = await req.json();
  const { fullName, email, password } = body;

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { error: 'All fields (fullName, email, password) are required.' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const newUser = await User.create({ fullName, email, password });

    const accessToken = signAccessToken({ userId: newUser._id });
    const refreshToken = signRefreshToken({ userId: newUser._id });

    const response = NextResponse.json({
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
    });

    // Set cookies manually using `cookie` header
    response.headers.append(
      'Set-Cookie',
      serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 15, // 15 minutes
      })
    );
    response.headers.append(
      'Set-Cookie',
      serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return response;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
