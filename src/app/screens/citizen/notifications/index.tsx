import { useNotifications } from "@/hooks/notifications/useNotifications";
import { deleteAllNotifications } from "@/services/shared/notifications/deleteNotifications/all";
import { updateAllNotifications } from "@/services/shared/notifications/updateNotification/all";
import NotificationTemplate from "@/template/notification";

export default function Notifications() {
  const {
    recentNotifications,
    previousNotifications,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useNotifications();

  return (
    <NotificationTemplate
      recent={recentNotifications}
      previous={previousNotifications}
      loading={loading}
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      goToPage={goToPage}
      onDeleteAll={deleteAllNotifications}
      onMarkAllAsRead={updateAllNotifications}
    />
  );
}