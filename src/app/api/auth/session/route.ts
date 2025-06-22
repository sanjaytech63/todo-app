import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth/actions';

export async function GET() {
  try {
    const user = await getSession();
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Session check failed' },
      { status: 500 }
    );
  }
}