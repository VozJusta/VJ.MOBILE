import { IDeleteNotificationsResponse } from "@/interfaces/services/shared/notifications/deleteNotifications";
import { INotification } from "@/interfaces/services/shared/notifications/listAllNotifications";
import { IUpdateNotificationsResponse } from "@/interfaces/services/shared/notifications/updateNotifications";

export interface IWebSocketNotification {
  onNew: (notification: INotification) => void;
  onUpdated: (payload: IUpdateNotificationsResponse) => void;
  onDeleted: (notificationId: IDeleteNotificationsResponse) => void;
}
