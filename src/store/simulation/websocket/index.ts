import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/settings/BASE_URL";

export function createSimulationSocket(): Socket {
  return io(`${BASE_URL}/simulation`, {
    transports: ["websocket"],
  });
}