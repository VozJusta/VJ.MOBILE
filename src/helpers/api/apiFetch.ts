import { refreshToken } from "@/services/users/security/refreshToken";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import { router } from "expo-router";

let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.onFailure(error);
    } else if (token) {
      promise.onSuccess(token);
    }
  });

  failedQueue = [];
};

export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const accessToken = useAccessTokenStorage.getState().accessToken;

  const headers = new Headers(init?.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const config: RequestInit = {
    ...init,
    headers,
  };

  let response = await fetch(input, config);

  console.log(
    `[apiFetch] ${init?.method || "GET"} ${input} → ${response.status}`,
  );

  if (response.status === 401) {
    console.log("[apiFetch] 401 recebido, tentando refresh...");
    if (isRefreshing) {
      return new Promise<Response>((resolve, reject) => {
        failedQueue.push({
          onSuccess: (newToken: string) => {
            config.headers = new Headers(config.headers);
            (config.headers as Headers).set(
              "Authorization",
              `Bearer ${newToken}`,
            );
            resolve(fetch(input, config));
          },
          onFailure: (err: Error) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshToken();

      console.log("[apiFetch] Refresh ok:", newToken.accessToken?.slice(0, 30));

      if (!newToken.success || !newToken.accessToken) {
        throw new Error("Falha ao atualizar o token.");
      }

      processQueue(null, newToken.accessToken);

      isRefreshing = false;

      const retryHeaders = new Headers(init?.headers);
      retryHeaders.set("Authorization", `Bearer ${newToken.accessToken}`);

      response = await fetch(input, { ...init, headers: retryHeaders });
      console.log("[apiFetch] Retry status:", response.status);
      return response;
    } catch (error) {
      console.log("[apiFetch] Refresh falhou:", error);

      processQueue(error as Error, null);
      isRefreshing = false;

      useAccessTokenStorage.getState().clearTokens();
      useRefreshTokenStorage.getState().clearTokens();

      router.replace("/screens/Onboarding/roles");

      throw error;
    }
  }

  return response;
}
