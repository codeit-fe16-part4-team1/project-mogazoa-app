import { NextResponse } from 'next/server';

export const POST = async () => {
  const res = NextResponse.json({ message: 'Signed out' }, { status: 200 });

  res.cookies.set('accessToken', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return res;
};
