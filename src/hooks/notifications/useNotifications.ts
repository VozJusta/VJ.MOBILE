import { useEffect, useState } from "react";
import { INotification } from "../../interfaces/services/shared/notifications/listAllNotifications";
import { listNotifications } from "@/services/shared/notifications/listNotifications";
import {
  connectNotificationSockets,
  disconnectNotificationSockets,
} from "@/store/simulation/websocket/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listNotifications().then((res) => {
      if (res.success && res.data) {
        setNotifications(res.data.items);
        setUnreadCount(res.data.items.filter((n) => !n.is_read).length);
      }
      setLoading(false);
    });

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

    return () => {
      disconnectNotificationSockets();
    };
  }, []);

  return { notifications, unreadCount, loading };
}
