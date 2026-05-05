import { useEffect, useState, useCallback } from "react";
import { INotification } from "../../interfaces/services/shared/notifications/listAllNotifications";
import { listNotifications } from "@/services/shared/notifications/listNotifications";
import {
  connectNotificationSockets,
  disconnectNotificationSockets,
} from "@/store/simulation/websocket/notifications";
import { usePagination } from "../shared/pagination";

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    page,
    hasNextPage,
    pageSize,
    setPaginationMeta,
    goToNextPage,
    totalPages,
    hasPreviousPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(10);

  const fetchPage = useCallback(
    async (pageToFetch: number) => {
      const res = await listNotifications(pageToFetch, pageSize);
      if (res.success && res.data) {
        const { data: items, pagination } = res.data;
        setNotifications(items);
        setUnreadCount(items.filter((n) => !n.is_read).length);
        setPaginationMeta(pagination);
      }
    },
    [pageSize, setPaginationMeta],
  );

  useEffect(() => {
    if (page === 1) return;
    setLoading(true);
    fetchPage(page).finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchPage(1).finally(() => setLoading(false));

    connectNotificationSockets({
      onNew(notification) {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      },
      onUpdated: ({ notificationIds }) => {
        setNotifications((prev) =>
          prev.map((n) =>
            !notificationIds || !notificationIds.includes(n.id)
              ? n
              : { ...n, is_read: true },
          ),
        );
        setUnreadCount((prev) =>
          notificationIds ? Math.max(0, prev - notificationIds.length) : 0,
        );
      },
      onDeleted: ({ notificationIds }) => {
        setNotifications((prev) =>
          !notificationIds
            ? []
            : prev.filter((n) => !notificationIds.includes(n.id)),
        );
      },
    });

    return () => disconnectNotificationSockets();
  }, [fetchPage]);

  const recentNotifications = notifications.filter((n) => !n.is_read);
  const previousNotifications = notifications.filter((n) => n.is_read);

  return {
    notifications,
    unreadCount,
    loading,
    hasNextPage,
    recentNotifications,
    previousNotifications,
    page,
    totalPages,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    fetchPage
  };
}
