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
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const { page, hasNextPage, pageSize, setPaginationMeta, goToNextPage } =
    usePagination(10);

  const fetchPage = useCallback(
    async (pageToFetch: number) => {
      const res = await listNotifications(pageToFetch, pageSize);
      if (res.success && res.data) {
        const { items, pagination } = res.data;
        setNotifications((prev) =>
          pageToFetch === 1 ? items : [...prev, ...items],
        );
        setUnreadCount((prev) =>
          pageToFetch === 1
            ? items.filter((n) => !n.is_read).length
            : prev + items.filter((n) => !n.is_read).length,
        );
        setPaginationMeta(pagination);
      }
    },
    [pageSize, setPaginationMeta],
  );

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

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasNextPage) return;
    setLoadingMore(true);
    goToNextPage();
    await fetchPage(page + 1);
    setLoadingMore(false);
  }, [loadingMore, hasNextPage, page, fetchPage, goToNextPage]);

  const recentNotifications = notifications.filter((n) => !n.is_read);
  const previousNotifications = notifications.filter((n) => n.is_read);

  return {
    notifications,
    unreadCount,
    loading,
    loadingMore,
    hasNextPage,
    loadMore,
    recentNotifications,
    previousNotifications,
  };
}
