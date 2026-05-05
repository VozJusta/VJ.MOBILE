import { INotification } from "@/interfaces/services/shared/notifications/listAllNotifications";

export interface INotificationTemplate {
  recent: INotification[];
  previous: INotification[];
  loading: boolean;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  onDeleteAll: () => void;
  onMarkAllAsRead: () => void;
  loadingDeleteAll?: boolean;
  loadingMarkAllAsRead?: boolean;
  onDeleteOneNotification?: (id: string) => void;
}
