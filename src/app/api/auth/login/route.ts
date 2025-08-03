import { NextResponse } from 'next/server';
import { loginUser } from '@/app/lib/auth';
export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const { user } = await loginUser(email, password);
    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
