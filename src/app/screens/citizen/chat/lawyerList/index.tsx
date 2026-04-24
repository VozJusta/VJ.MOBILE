import Badge from "@/components/Badge";
import Header from "@/components/Header";
import LawyerCard from "@/components/LawyerCard";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyCases from "@/assets/svg/empty-cases.svg";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import InputUI from "@/ui/InputUI";
import { router } from "expo-router";
import { useLawyersList } from "@/hooks/citizen/lawyerList/useLawyersList";
import Skeletons from "@/components/Skeletons";
import { getCategoryLabel } from "@/utils/screens/citizen/home";

export default function LawyerList() {
  const {
    lawyers,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    refresh,
  } = useLawyersList(4);

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

  console.log("lawyers", lawyers);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, gap: 32 }}>
        <FlatList
          contentContainerClassName="gap-8"
          ListHeaderComponent={
            <>
              <View className="w-full h-fit border-b-[#FFFFFF]/5 flex flex-col gap-4 border-b-[1px] pb-4">
                <Header
                  title="LISTA DE ADVOGADOS"
                  isFirstPage={false}
                  isCitizen={true}
                />
                <InputUI
                  placeholder={"Buscar por nome do advogado"}
                  iconSize={24}
                  iconNameProps={"search"}
                  iconColor="#94A3B8"
                  leftIcon
                  type={"text"}
                />
                <View className="flex flex-row gap-2 w-full items-center">
                  <Text className="font-interSemiBold text-[16px] text-white text-center">
                    Área do caso:
                  </Text>
                  <Badge
                    badgeColor="#0D59F2"
                    textBadge="DIREITO DO CONSUMIDOR"
                  />
                </View>
              </View>
            </>
          }
          data={lawyers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex flex-col gap-4">
              <LawyerCard
                {...item}
                onPress={() =>
                  router.push({
                    pathname: "/screens/citizen/chat/lawyerList/lawyerSelected/[id]",
                    params: { id: item.id },
                  })
                }
                name={item.full_name}
                badges={[
                  {
                    badgeColor: "#0D59F2",
                    textBadge: getCategoryLabel(item.specialization),
                  },
                ]}
              />
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              <Skeletons amountOfSkeletons={4} height={100} />
            ) : (
              <>
                <EmptyCases />

                <Text className="text-[24px] font-interBold text-white text-center">
                  Nenhum advogado por aqui
                </Text>
                <Text className="text-[14px] font-interRegular text-[#94A3B8] text-center">
                  Infelizmente, não encontramos nenhum advogado disponível no
                  momento. Estamos constantemente atualizando nossa lista de
                  profissionais para garantir que você tenha acesso aos melhores
                  serviços jurídicos. Por favor, volte mais tarde para verificar
                  se novos advogados foram adicionados.
                </Text>

                <ButtonUI
                  onPress={() => router.push(`/screens/citizen/home`)}
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
                      Ir para página inicial
                    </Text>
                  </View>
                </ButtonUI>
              </>
            )
          }
          ListFooterComponent={
            loading && lawyers.length > 0 ? (
              <Skeletons amountOfSkeletons={1} height={50} />
            ) : lawyers.length > 0 && totalPages > 1 ? (
              <View className="flex-row items-center justify-between w-full mt-4 bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[16px] px-[16px] py-[12px]">
                <TouchableOpacity
                  onPress={goToPreviousPage}
                  disabled={!hasPreviousPage || loading}
                  className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                    hasPreviousPage && !loading
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
                      disabled={loading}
                      className={`w-[40px] h-[40px] rounded-[12px] justify-center items-center ${
                        page === num
                          ? "bg-[#2563EB]"
                          : "bg-white/5 border border-solid border-white/10"
                      } ${loading ? "opacity-50" : ""}`}
                    >
                      <Text
                        className={`font-interBold text-[16px] ${page === num ? "text-white" : "text-[#94A3B8]"}`}
                      >
                        {num}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <Text className="text-[#94A3B8] font-interBold text-[16px]">
                      ...
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={goToNextPage}
                  disabled={!hasNextPage || loading}
                  className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                    hasNextPage && !loading
                      ? "bg-[#2563EB]"
                      : "bg-transparent opacity-30 border border-solid border-white/10"
                  }`}
                  style={
                    hasNextPage &&
                    !loading && {
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
          refreshing={loading}
          onRefresh={refresh}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
