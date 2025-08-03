import { NextResponse } from 'next/server';
import { loginUser } from '@/app/lib/auth';
export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const { user } = await loginUser(email, password);
    return NextResponse.json({ user });
  } catch (e: unknown) {
  const message = e instanceof Error ? e.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status: 401 });
}
}
