import { NextResponse } from 'next/server';
import { destroySession } from '@/app/lib/auth/actions';

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Logout failed' },
      { status: 500 }
    );
  }
}