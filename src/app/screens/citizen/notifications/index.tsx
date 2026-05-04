import { useNotifications } from "@/hooks/notifications/useNotifications";
import { deleteAllNotifications } from "@/services/shared/notifications/deleteNotifications/all";
import { updateAllNotifications } from "@/services/shared/notifications/updateNotification/all";
import NotificationTemplate from "@/template/notification";

export default function Notifications() {
  const {
    recentNotifications,
    previousNotifications,
    loading,
    hasNextPage,
  } = useNotifications();

  return (
    <NotificationTemplate
      recent={recentNotifications}
      previous={previousNotifications}
      loading={loading}
      hasNextPage={hasNextPage}
      onDeleteAll={deleteAllNotifications}
      onMarkAllAsRead={updateAllNotifications}
    />
  );
}
