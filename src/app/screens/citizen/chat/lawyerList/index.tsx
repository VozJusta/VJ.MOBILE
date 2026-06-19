import Header from "@/components/Header";
import LawyerCard from "@/components/LawyerCard";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
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
import Pagination from "@/components/Pagination";
import { useState } from "react";

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
    allLawyers,
  } = useLawyersList(4);

  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, gap: 32, paddingBottom: 20 }}>
        <FlatList
          contentContainerClassName="gap-8"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </>
          }
          data={
            name
              ? allLawyers.filter((l) =>
                  l.full_name.toLowerCase().includes(name.toLowerCase()),
                )
              : lawyers
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex flex-col gap-4">
              <LawyerCard
                {...item}
                onPress={() =>
                  router.push({
                    pathname:
                      "/screens/citizen/chat/lawyerList/lawyerSelected/[id]",
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
              <View className="flex-1 justify-center items-center gap-8">
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
                </View>
              
            )
          }
          ListFooterComponent={
            !name ? (
              loading && lawyers.length > 0 ? (
                <Skeletons amountOfSkeletons={1} height={50} />
              ) : lawyers.length > 0 && totalPages > 1 ? (
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
            ) : null
          }
          refreshing={loading}
          onRefresh={refresh}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
