import { IDeleteNotificationsResponse } from "@/interfaces/services/shared/notifications/deleteNotifications";
import { INotification } from "@/interfaces/services/shared/notifications/listAllNotifications";
import { IUpdateNotificationsResponse } from "@/interfaces/services/shared/notifications/updateNotifications";
import { IWebSocketNotification } from "@/interfaces/websocket/notification";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { io } from "socket.io-client";

const token = useAccessTokenStorage.getState().accessToken;

const socket = io(`${BASE_URL}/notifications`, {
  transports: ["websocket"],
  auth: { token: token ? `Bearer ${token}` : null },
});
export function connectNotificationSockets(handlers: IWebSocketNotification) {
  socket.on("connect", () => {
    socket.emit("notifications:subscribe");
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
  if (!socket.connected) return;

  socket.emit("notifications:mark-as-read", { notificationIds });
}

export function disconnectNotificationSockets() {
    socket.disconnect();
    return;
}
