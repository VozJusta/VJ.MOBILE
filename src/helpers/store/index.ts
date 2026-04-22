import { IDecodedToken } from "@/interfaces/shared/decodedToken";

export const isTokenExpired = (accessToken: IDecodedToken): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return accessToken.exp < currentTime;
};
