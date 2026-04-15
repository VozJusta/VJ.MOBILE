import { IDecodedToken } from "@/interfaces/services/token/token";

export const isTokenExpired = (accessToken: IDecodedToken): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return accessToken.exp < currentTime;
};
