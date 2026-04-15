import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputUI from "@/ui/InputUI";
import { casesData } from "@/utils/home/cases/data";
import Header from "@/components/Header";
import EmptyCases from "@/assets/svg/empty-cases.svg";
import { MaterialIcons } from "@expo/vector-icons";
import CaseCard from "@/components/CaseCard";

export default function ListCases() {
  const router = useRouter();
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
        }
        contentContainerClassName="flex flex-col gap-6 items-center"
        data={casesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CaseCard 
            iconName={item.icon}
            title={item.title}
            status={item.status}
            onPress={() => router.push(`/screens/citizen/home/listCases/caseSelected/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
