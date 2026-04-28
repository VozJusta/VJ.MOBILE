import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputUI from "@/ui/InputUI";
import Header from "@/components/Header";
import EmptyCases from "@/assets/svg/empty-cases.svg";
import { MaterialIcons } from "@expo/vector-icons";
import CaseCard from "@/components/CaseCard";
import { useDashboardCitizen } from "@/hooks/dashboard/citizen/useDashboardCitizen";
import { getCategoryLabel, getStatusIcon } from "@/utils/screens/citizen/home";
import Skeletons from "@/components/Skeletons";
import Pagination from "@/components/Pagination";

export default function ListCases() {
  const router = useRouter();

  const {
    reports,
    loading,
    totalPages,
    hasNextPage,
    goToNextPage,
    goToPreviousPage,
    hasPreviousPage,
    goToPage,
    page
  } = useDashboardCitizen(5);

  return (
    <SafeAreaView style={{ flex: 1 }} className="gap-[32px]">
      <Header title="MEUS CASOS" isFirstPage={false} isCitizen={true} />
      <InputUI
        placeholder={"Buscar por título ou status..."}
        iconSize={24}
        iconNameProps={"search"}
        iconColor="#94A3B8"
        leftIcon
        type={"text"}
      />
      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <Skeletons height={100} amountOfSkeletons={4} />
          ) : (
            <>
              <EmptyCases />

              <Text className="text-[24px] font-interBold text-white text-center">
                Nenhum caso por aqui
              </Text>
              <Text className="text-[14px] font-interRegular text-[#94A3B8] text-center">
                Você ainda não iniciou nenhum relato jurídico. Clique no botão
                abaixo para começar a garantir seus direitos.
              </Text>

              <ButtonUI
                onPress={() => router.push(`/screens/citizen/chat/`)}
                gradient
                bg="bg-[#135BEC]"
                hover={false}
                size="w-full h-[56px]"
                iconLeft={false}
                paddingButtonStatus=""
              >
                <View className="flex-1 flex-row justify-center gap-3 items-center">
                  <MaterialIcons name="add" size={24} color="white" />
                  <Text className="text-[16px] font-interBold text-white text-center">
                    Relatar novo caso
                  </Text>
                </View>
              </ButtonUI>
            </>
          )
        }
        contentContainerClassName="flex flex-col gap-6 items-center"
        contentContainerStyle={{ flexGrow: 1 }}
        data={loading ? [] : reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CaseCard
            iconName={getStatusIcon(item.status)}
            title={getCategoryLabel(item.category_detected)}
            status={item.status}
            onPress={() =>
              router.push(
                `/screens/citizen/home/listCases/caseSelected/${item.id}`,
              )
            }
          />
        )}
        ListFooterComponent={
          reports.length > 0 && totalPages > 1 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              loading={loading}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              goToPage={goToPage}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
