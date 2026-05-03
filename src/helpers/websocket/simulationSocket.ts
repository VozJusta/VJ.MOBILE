import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export function createSimulationSocket(): Socket {
  const token = useAccessTokenStorage.getState().accessToken;

  return io(`${BASE_URL}/simulation`, {
    transports: ["websocket"],
    auth: { token: token ? `Bearer ${token}` : null },
  });
}
