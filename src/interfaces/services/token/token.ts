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

export interface IValidateCodeForgotResponse {
  message: string;
}

export interface IDecodedToken {
  fullName: string;
  email: string;
  exp: number;
  sub: string;
  role: string;
}
