import { EXPIRED_COOKIE_OPTIONS } from '@/utils/cookieOptions';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const res = NextResponse.json({ message: 'Signed out' }, { status: 200 });
  res.cookies.set('accessToken', '', EXPIRED_COOKIE_OPTIONS);
  res.cookies.set('loginType', 'default', EXPIRED_COOKIE_OPTIONS);
  return res;
};
