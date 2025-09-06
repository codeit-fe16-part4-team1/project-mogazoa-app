export const DEFAULT_COOKIE_OPTIONS = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 6, //6시간
};

export const HTTPONLY_COOKIE_OPTIONS = {
  ...DEFAULT_COOKIE_OPTIONS,
  httpOnly: true,
};

export const EXPIRED_COOKIE_OPTIONS = {
  ...DEFAULT_COOKIE_OPTIONS,
  maxAge: 0,
};
