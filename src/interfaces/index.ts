import { useEffect, useState } from "react";
import { INotification } from "./services/shared/notifications/listAllNotifications";
import { listNotifications } from "@/services/shared/notifications/listNotifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    listNotifications().then((res) => {
      if (res.success && res.data) {
        setNotifications(res.data.items);
        setUnreadCount(res.data.items.filter((n) => !n.is_read).length);
      }
      setLoading(false);
    });
  }, []);
}
