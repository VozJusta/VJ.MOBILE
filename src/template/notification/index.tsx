import Header from "@/components/Header";
import NotificationCard, {
  NotificationCardProps,
} from "@/components/NotificationCard";
import ButtonUI from "@/ui/ButtonUI";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface NotificationTemplateProps {
  notifications: NotificationCardProps[];
}

export default function NotificationTemplate({
  notifications,
}: NotificationTemplateProps) {
  return (
    <SafeAreaView>
      <Header isFirstPage={false} title="NOTIFICAÇÕES"></Header>
      <FlatList
        data={notifications}
        renderItem={({ item: notification }) => (
          <NotificationCard {...notification} />
        )}
        keyExtractor={(item) => item.id}
      />
      <ButtonUI
        iconLeft={true}
        gradient={true}
        colorsStatus="blue"
        hover={false}
        paddingButtonStatus="px-[16px] py-[12px]"
        onPress={() => console.log("Limpei tudo")}
      />
    </SafeAreaView>
  );
}
