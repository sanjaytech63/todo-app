import { cookies } from 'next/headers';
import { verifyRefreshToken, signAccessToken } from '@/app/lib/jwt';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) {
    return Response.json({ error: 'Missing refresh token' }, { status: 401 });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const newAccess = signAccessToken({ userId: (decoded as any).userId });

    cookieStore.set('accessToken', newAccess, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 15,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
