import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AuthResponse } from '@/types/api';
import { DEFAULT_COOKIE_OPTIONS } from '@/utils/cookieOptions';

const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const response = await axios.post<AuthResponse>(`${BaseURL}/auth/signUp`, body);
    const { accessToken, user } = response.data;

    const res = NextResponse.json(user, { status: 200 });
    res.cookies.set('accessToken', accessToken, DEFAULT_COOKIE_OPTIONS);
    res.cookies.set('userId', String(user.id), DEFAULT_COOKIE_OPTIONS);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
