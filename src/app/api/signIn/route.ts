import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { User } from '@/types/api';

const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SignInResponse {
  accessToken: string;
  user: User;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    console.log(`${BaseURL}/auth/signUp`);
    const response = await axios.post<SignInResponse>(`${BaseURL}/auth/signIn`, body);
    const { accessToken, user } = response.data;

    const res = NextResponse.json(user, { status: 200 });
    res.cookies.set('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10,
    });

    return res;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
