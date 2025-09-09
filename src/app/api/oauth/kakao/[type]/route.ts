import { AuthResponse } from '@/types/api';
import { DEFAULT_COOKIE_OPTIONS, HTTPONLY_COOKIE_OPTIONS } from '@/utils/cookieOptions';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const POST = async (req: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params;

  if (!['signIn', 'signUp'].includes(type)) {
    return NextResponse.json({ message: 'Invalid auth type' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const response = await axios.post<AuthResponse>(`${BaseURL}/auth/${type}/kakao`, body);
    const { accessToken, user } = response.data;

    const res = NextResponse.json(user, { status: 200 });
    res.cookies.set('accessToken', accessToken, HTTPONLY_COOKIE_OPTIONS);
    res.cookies.set('userId', String(user.id), DEFAULT_COOKIE_OPTIONS);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
