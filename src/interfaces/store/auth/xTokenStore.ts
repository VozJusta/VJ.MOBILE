export interface IXTokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
