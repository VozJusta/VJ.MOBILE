
import { NotificationTemplateProps } from "@/interfaces/template/NotificationTemplate";
import NotificationTemplate from "@/template/notification";

export const data: NotificationTemplateProps = {
  notifications: [
    
  ],
};

export default function Notifications() {
  return <NotificationTemplate notifications={data.notifications} />;
}
