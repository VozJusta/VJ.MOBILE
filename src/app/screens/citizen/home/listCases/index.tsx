import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputUI from "@/ui/InputUI";
import Header from "@/components/Header";
import EmptyCases from "@/assets/svg/empty-cases.svg";
import { MaterialIcons } from "@expo/vector-icons";
import CaseCard from "@/components/CaseCard";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import {
  getCategoryLabel,
  getStatusIcon,
  translateStatus,
} from "@/utils/screens/citizen/home";

export default function ListCases() {
  const router = useRouter();

  const {
    reports,
    loading,
    page,
    totalPages,
    hasNextPage,
    goToNextPage,
    goToPreviousPage,
    hasPreviousPage,
    goToPage
  } = useDashboard(5);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View className="justify-center items-center h-full">
              <ActivityIndicator size="large" color="#fff" />
            </View>
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
                onPress={() => router.push(`/screens/citizen/home/newRequest`)}
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
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CaseCard
            iconName={getStatusIcon(item.status)}
            title={getCategoryLabel(item.category_detected)}
            status={translateStatus(item.status)}
            onPress={() =>
              router.push(
                `/screens/citizen/home/listCases/caseSelected/${item.id}`,
              )
            }
          />
        )}
        ListFooterComponent={
          reports.length > 0 && totalPages > 1 ? (
            <View className="flex-row items-center justify-between w-full mt-4 bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[16px] px-[16px] py-[12px]">
              <TouchableOpacity
                onPress={goToPreviousPage}
                disabled={!hasPreviousPage || loading}
                className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                  hasPreviousPage
                    ? "bg-white/5 border border-solid border-white/10"
                    : "bg-transparent opacity-30"
                }`}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>

              <View className="flex-row items-center gap-3">
                {pageNumbers.map((num) => (
                  <TouchableOpacity
                    onPress={() => goToPage(num)}
                    key={num}
                    className={`w-[40px] h-[40px] rounded-[12px] justify-center items-center ${
                      page === num
                        ? "bg-[#2563EB]"
                        : "bg-white/5 border border-solid border-white/10"
                    }`}
                  >
                    <Text
                      className={`font-interBold text-[16px] ${page === num ? "text-white" : "text-[#94A3B8]"}`}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={goToNextPage}
                disabled={!hasNextPage || loading}
                className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                  hasNextPage
                    ? "bg-[#2563EB]"
                    : "bg-transparent opacity-30 border border-solid border-white/10"
                }`}
                style={
                  hasNextPage && {
                    shadowColor: "#1E3A8A",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 8,
                  }
                }
              >
                <MaterialIcons name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
