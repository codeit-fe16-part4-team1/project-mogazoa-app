interface KakaoAuthOptions {
  redirectUri: string;
  scope?: string;
  prompt?: 'none' | 'login' | 'select_account';
  serviceTerms?: string;
  loginHint?: string;
  state?: string;
}

interface KakaoLogoutResponse {
  id: number;
}

interface KakaoUserProfile {
  nickname: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
}

interface KakaoAccount {
  profile_nickname_needs_agreement: boolean;
  profile: KakaoUserProfile;
  email?: string;
  email_needs_agreement?: boolean;
}

interface KakaoUserInfo {
  id: number;
  connected_at: string;
  kakao_account: KakaoAccount;
}

interface KakaoAPIOptions {
  url: string;
  data?: Record<string, string | number | boolean | string[]>;
}

interface KakaoAuth {
  authorize: (options: KakaoAuthOptions) => void;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
  logout: () => Promise<KakaoLogoutResponse>;
}

interface KakaoAPI {
  request: (
    options: KakaoAPIOptions,
  ) => Promise<KakaoUserInfo | KakaoLogoutResponse | { id: number }>;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}
