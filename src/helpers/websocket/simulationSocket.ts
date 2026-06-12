import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export function createSimulationSocket(): Socket {
  const token = useAccessTokenStorage.getState().accessToken;

  if (!BASE_URL) {
    throw new Error("BASE_URL não definida. Verifique suas variáveis de ambiente.");
  }

  return io(`${BASE_URL}/simulation`, {
    transports: ["websocket"],
    auth: { token: token ?? "" },
  });
}