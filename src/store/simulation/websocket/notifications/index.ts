import { IDeleteNotificationsResponse } from "@/interfaces/services/shared/notifications/deleteNotifications";
import { INotification } from "@/interfaces/services/shared/notifications/listAllNotifications";
import { IUpdateNotificationsResponse } from "@/interfaces/services/shared/notifications/updateNotifications";
import { IWebSocketNotification } from "@/interfaces/websocket/notification";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectNotificationSockets(handlers: IWebSocketNotification) {
  const token = useAccessTokenStorage.getState().accessToken;

  socket = io(`${BASE_URL}/notifications`, {
    transports: ["websocket"],
    auth: { token: token ? `Bearer ${token}` : null },
  });

  socket.on("connect", () => {
    socket?.emit("notifications:subscribe");
  });

  socket.on("notifications:new", (data: INotification) => {
    handlers.onNew(data);
  });

  socket.on("notifications:updated", (data: IUpdateNotificationsResponse) => {
    handlers.onUpdated(data);
  });

  socket.on("notifications:deleted", (data: IDeleteNotificationsResponse) => {
    handlers.onDeleted(data);
  });
}

export function markNotificationAsRead(notificationIds?: string[]) {
  if (!socket?.connected) return;

  socket.emit("notifications:mark-read", { notificationIds });
}

export function disconnectNotificationSockets() {
  socket?.disconnect();
  socket = null;
}