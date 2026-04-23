import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputUI from "@/ui/InputUI";
import Header from "@/components/Header";
import EmptyCases from "@/assets/svg/empty-cases.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { documentsData } from "@/utils/documents/data";
import DocCard from "@/components/DocCard";

export default function AllDocuments() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} className="gap-[32px]">
      <Header title="MEUS DOCUMENTOS" isFirstPage={false} isCitizen={true} />
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
          <>
            <EmptyCases />

            <Text className="text-[24px] font-interBold text-white text-center">
              Nenhum documento por aqui
            </Text>
            <Text className="text-[14px] font-interRegular text-[#94A3B8] text-center">
              Você ainda não adicionou nenhum documento. Clique no botão para
              começar adicionar seus documentos e garantir seus direitos.
            </Text>

            <ButtonUI
              onPress={() => router.push(`/screens/citizen/documents`)}
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
                  Adicionar documento
                </Text>
              </View>
            </ButtonUI>
          </>
        }
        contentContainerClassName="flex flex-col gap-6 items-center"
        data={documentsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <DocCard nameFile={item.nameFile} date={item.date} size={item.size} />
        )}
      />
    </SafeAreaView>
  );
}
