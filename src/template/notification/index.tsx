import Header from "@/components/Header";
import { INotificationTemplate } from "@/interfaces/template/NotificationTemplate";
import {
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyNotifications from "@/assets/svg/empty-cases.svg";
import NotificationCard from "@/components/NotificationCard";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import {
  mapTypeToBgColor,
  mapTypeToIcon,
  mapTypeToIconColor,
} from "@/utils/components/NotificationCard";
import Pagination from "@/components/Pagination";

export default function NotificationTemplate({
  recent,
  previous,
  loading,
  onDeleteAll,
  onMarkAllAsRead,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  goToNextPage,
  goToPreviousPage,
  goToPage,
}: INotificationTemplate) {
  const sections = [
    ...((recent ?? []).length > 0
      ? [{ title: "Recentes", data: recent ?? [] }]
      : []),
    ...((previous ?? []).length > 0
      ? [{ title: "Anteriores", data: previous ?? [] }]
      : []),
  ];
  return (
    <SafeAreaView className="flex-1">
      <Header isFirstPage={false} title="NOTIFICAÇÕES" isCitizen={true} />

      {loading ? (
        <ActivityIndicator className="flex-1" color="#FFFFFF" />
      ) : (
        <>
          <SectionList
            className="mt-4"
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => (
              <View className="flex-row items-center justify-between py-3">
                <Text className="font-interSemiBold text-[16px] text-white">
                  {title}
                </Text>
                {title === "Recentes" && (
                  <TouchableOpacity onPress={onMarkAllAsRead}>
                    <Text className="font-interSemiBold text-[12px] text-blue-500">
                      MARCAR TODAS COMO LIDAS
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            renderItem={({ item }) => (
              <NotificationCard
                id={item.id}
                title={item.title}
                description={item.body}
                date={new Date(item.created_at)}
                icon={mapTypeToIcon(item.type)}
                iconColor={mapTypeToIconColor(item.type)}
                bgColor={mapTypeToBgColor(item.type)}
              />
            )}
            ListEmptyComponent={
              <View className="flex-1 flex-col items-center justify-center gap-2 mt-20">
                <EmptyNotifications width={300} height={300} />
                <Text className="font-interSemiBold text-[32px] text-white">
                  Tudo limpo por aqui!
                </Text>
                <Text className="font-interRegular text-[14px] text-[#94A3B8] text-center">
                  Você não tem nenhuma notificação no momento.
                </Text>
              </View>
            }
            stickySectionHeadersEnabled={false}
          />

          {sections.length > 0 && (
            <ButtonUI
              iconLeft={true}
              gradient={true}
              hover={false}
              paddingButtonStatus="px-[16px] py-[12px] my-4"
              onPress={onDeleteAll}
              children={
                <View className="w-full h-full flex-row items-center justify-center gap-2">
                  <MaterialIcons
                    name="delete-sweep"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text className="font-interSemiBold text-[14px] text-white">
                    Limpar tudo
                  </Text>
                </View>
              }
            />
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              goToPage={goToPage}
              loading={loading}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
