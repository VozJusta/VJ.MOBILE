import {
  TypeNotificationBgColor,
  TypeNotificationColor,
  TypeNotificationIcon,
} from "@/interfaces/components/TypeNotificationCard";
import { TypeNotification } from "@/interfaces/services/shared/notifications/listAllNotifications";

export function mapTypeToIcon(type: TypeNotification): TypeNotificationIcon {
  switch (type) {
    case TypeNotification.REQUEST_SENT:
      return TypeNotificationIcon.NOTIFICATION;
    case TypeNotification.REQUEST_ACCEPTED:
      return TypeNotificationIcon.SUCCESS;
    case TypeNotification.REQUEST_REFUSED:
      return TypeNotificationIcon.ALERT;
    default:
      return TypeNotificationIcon.NOTIFICATION;
  }
}

export function mapTypeToIconColor(type: TypeNotification): string {
  switch (type) {
    case TypeNotification.REQUEST_SENT:
      return TypeNotificationColor.NOTIFICATION;
    case TypeNotification.REQUEST_ACCEPTED:
      return TypeNotificationColor.SUCCESS;
    case TypeNotification.REQUEST_REFUSED:
      return TypeNotificationColor.ALERT;
    default:
      return TypeNotificationColor.NOTIFICATION;
  }
}

export function mapTypeToBgColor(type: TypeNotification): string {
  switch (type) {
    case TypeNotification.REQUEST_SENT:
      return TypeNotificationBgColor.NOTIFICATION;
    case TypeNotification.REQUEST_ACCEPTED:
      return TypeNotificationBgColor.SUCCESS;
    case TypeNotification.REQUEST_REFUSED:
      return TypeNotificationBgColor.ALERT;
    default:
      return TypeNotificationBgColor.NOTIFICATION;
  }
}
