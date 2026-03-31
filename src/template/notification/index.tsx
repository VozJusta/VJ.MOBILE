import Header from "@/components/Header";
import NotificationCard from "@/components/NotificationCard";
import { NotificationTemplateProps } from "@/interfaces/template/NotificationTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyNotification from "@/assets/svg/illustration-empty-notification.svg";

export default function NotificationTemplate({
  notifications,
}: NotificationTemplateProps) {
  return (
    <SafeAreaView className="flex-1 px-4 py-6 gap-4">
      <Header isFirstPage={false} title="NOTIFICAÇÕES"></Header>
      <FlatList
        className="mt-8"
        data={notifications}
        renderItem={({ item: notification }) => (
          <NotificationCard {...notification} />
        )}
        ListEmptyComponent={
          <View className="flex flex-col items-center gap-2">
            <EmptyNotification width={200} height={200} />
            <Text className="font-interSemiBold text-[32px] text-white">
              Tudo limpo por aqui!
            </Text>
            <Text className="font-interRegular text-[14px] text-[#94A3B8] w-fit h-fit text-center">
              Você não tem nenhuma notificação nova no momento. Avisaremos assim
              que algo importante acontecer.
            </Text>
          </View>
        }
        keyExtractor={(item) => item.id}
      />
      <ButtonUI
        iconLeft={true}
        gradient={true}
        colorsStatus="blue"
        hover={false}
        paddingButtonStatus="px-[16px] py-[12px]"
        onPress={() => console.log("Limpei tudo")}
        children={
          <View className="w-full h-full flex-row items-center justify-center gap-2">
            <MaterialIcons name="delete-sweep" size={20} color="#FFFFFF" />
            <Text className="font-interSemiBold text-[14px] text-white">
              Limpar tudo
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
