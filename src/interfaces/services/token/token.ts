export interface IAccessTokenStore {
  accessToken: string | null;
  setTokens: (accessToken: string) => void;
  clearTokens: () => void;
}

export interface IRefreshTokenStore {
  refreshToken: string | null;
  setTokens: (refreshToken: string) => void;
  clearTokens: () => void;
}

export interface ITokenService {
  access_token: string | null;
  refresh_token: string | null;
}

export interface IDecodedToken {
  fullName: string;
  email: string;
  sub: string;
  role: string;
}