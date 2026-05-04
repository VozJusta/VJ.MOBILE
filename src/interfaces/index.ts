import { useState } from "react";
import { INotification } from "./services/shared/notifications/listAllNotifications";

export function useNotifications() {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
}