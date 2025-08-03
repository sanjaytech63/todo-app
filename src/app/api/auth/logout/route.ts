import { clearAuthCookies } from '@/app/lib/cookies';

export async function POST() {
  clearAuthCookies();
  return Response.json({ success: true });
}
