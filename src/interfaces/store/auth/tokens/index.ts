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


export interface IXTokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
