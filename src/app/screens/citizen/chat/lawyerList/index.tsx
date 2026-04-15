import Badge from "@/components/Badge";
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
import { lawyers } from "./data";
import InputUI from "@/ui/InputUI";
import { router } from "expo-router";

export default function LawyerList() {
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
                  <Text className="font-interSemiBold text-[16px] text-white text-center">Área do caso:</Text>
                  <Badge
                    badgeColor="#0D59F2"
                    textBadge="DIREITO DO CONSUMIDOR"
                  />
                </View>
              </View>
            </>
          }
          data={lawyers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex flex-col gap-4">
              <LawyerCard {...item}/>
            </View>
          )}
          ListEmptyComponent={
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
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
