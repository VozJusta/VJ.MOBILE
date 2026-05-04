import { INotification } from "@/interfaces/services/shared/notifications/listAllNotifications";

export interface INotificationTemplate {
  recent: INotification[];
  previous: INotification[];
  loading: boolean;
  loadingMore: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
  onDeleteAll: () => Promise<unknown>;
  onMarkAllAsRead: () => Promise<unknown>;
}