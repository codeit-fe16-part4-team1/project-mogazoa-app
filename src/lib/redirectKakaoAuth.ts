export const redirectKakaoAuth = {
  signin: () => {
    redirect({});
  },
  signup: ({ state }: { state: string }) => {
    redirect({ state });
  },
};

interface RedirectFunctionType {
  state?: string;
}

const redirect = ({ state }: RedirectFunctionType) => {
  const redirectUri = `${window.location.origin}/oauth/signup/kakao`;
  if (process.env.NODE_ENV === 'development') {
    const clientId = process.env.NEXT_PUBLIC_JS_KEY_KAKAO; // 환경변수에서

    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `${state ? `state=${encodeURIComponent(state)}&` : ''}` +
      `prompt=login`;

    window.location.href = kakaoAuthUrl;
  } else if (process.env.NODE_ENV === 'production') {
    Kakao.Auth.authorize({
      redirectUri,
      ...(state && { state }),
    });
  }
};
