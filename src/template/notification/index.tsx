import Header from "@/components/Header";
import NotificationCard from "@/components/NotificationCard";
import { NotificationTemplateProps } from "@/interfaces/template/NotificationTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationTemplate({
  notifications,
}: NotificationTemplateProps) {
  return (
    <SafeAreaView className="flex-1 px-4 py-6 gap-4">
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
