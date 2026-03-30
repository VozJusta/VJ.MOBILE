import { NotificationCardProps } from "@/components/NotificationCard";
import { TypeNotificationColor, TypeNotificationIcon } from "@/components/TypeNotificationCard";
import NotificationTemplate from "@/template/notification";

export const data: NotificationCardProps[] = [
    {
        id: "1",
        title: "Nova denúncia recebida",
        description: "Você recebeu uma nova denúncia sobre poluição sonora.",
        date: new Date("2024-06-01T10:30:00"),
        icon: TypeNotificationIcon.NOTIFICATION,
        iconColor: TypeNotificationColor.NOTIFICATION,
        bgColor: TypeNotificationColor.NOTIFICATION,
    }
]

export default function Notifications() {
    return (
        <NotificationTemplate notifications={data} />
    )
}