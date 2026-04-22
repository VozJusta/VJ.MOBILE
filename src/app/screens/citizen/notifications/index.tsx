
import { INotificationTemplate } from "@/interfaces/template/NotificationTemplate";
import NotificationTemplate from "@/template/notification";

export const data: INotificationTemplate = {
  notifications: [
    
  ],
};

export default function Notifications() {
  return <NotificationTemplate notifications={data.notifications} />;
}
