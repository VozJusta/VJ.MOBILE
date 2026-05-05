import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import ButtonUI from "@/ui/ButtonUI";
import { router, useLocalSearchParams } from "expo-router";
import { useLawyersList } from "@/hooks/citizen/lawyerList/useLawyersList";
import Skeletons from "@/components/Skeletons";
import { getCategoryLabel } from "@/utils/screens/citizen/home";
import { useChatStorage } from "@/store/chat/chat.store";

export default function LawyerSelected() {
  const { id } = useLocalSearchParams();
  const { fetchLawyerById, loading, lawyerSelected, sendRequestToLawyer } =
    useLawyersList();
  const { caseId } = useChatStorage();

  useEffect(() => {
    if (id) fetchLawyerById(id as string);
  }, [id]);

  const handleSendRequest = async () => {
    if (!lawyerSelected) return;

    const result = await sendRequestToLawyer(caseId, lawyerSelected.id);

    console.log("Result of sending request to lawyer:", result);
    console.log("caseId:", caseId);           // ← confirma se tem valor
  console.log("lawyerId:", lawyerSelected.id);

    if (result) {
      router.push(
        "/screens/citizen/chat/lawyerList/lawyerSelected/requestConcluded",
      );
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, gap: 32 }}
      className="flex-1 gap-8 items-center"
    >
      <Header
        isFirstPage={false}
        title={
          loading ? "Carregando..." : lawyerSelected?.full_name || "Advogado"
        }
        isCitizen={true}
      />

      {loading || !lawyerSelected ? (
        <Skeletons amountOfSkeletons={3} height={200} />
      ) : (
        <>
          <View className=" rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] bg-[#1E293B] justify-center items-center">
            <MaterialIcons name="person" size={48} color={"#8E8E93"} />
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="font-interBold text-[24px] text-[#F1F5F9]">
              {lawyerSelected.full_name}
            </Text>
            <Text className="font-interRegular text-[14px] text-[#94A3B8]">
              OAB/{lawyerSelected.oab_state} {lawyerSelected.oab_number}
            </Text>
          </View>

          <View className="flex flex-col items-start gap-3 w-full ">
            <View className="flex flex-row gap-2 justify-center">
              <MaterialIcons name="work" color={"#1152D4"} size={20} />
              <Text className="text-[16px] font-interSemiBold text-white">
                Especialidades
              </Text>
            </View>
            <View className="flex flex-row gap-3 items-center p-3 bg-[#1152D4]/5 rounded-lg w-full border border-[#fff]/10">
              <View className="flex items-center justify-center p-2 bg-[#1152D4]/15 rounded-lg">
                <MaterialIcons name="gavel" color={"#1152D4"} size={24} />
              </View>
              <Text className="text-white text-[14px] font-interSemiBold">
                {getCategoryLabel(lawyerSelected.specialization)}
              </Text>
            </View>
          </View>

          {lawyerSelected.bio ? (
            <View className="flex flex-col p-6 items-start gap-6 w-full bg-[#1152D4]/5 border border-[#FFFFFF]/10 rounded-lg">
              <View className="flex flex-row gap-1 items-center pb-4 border-b border-b-[#FFFFFF]/10 w-full">
                <MaterialIcons name="location-on" color={"#1152D4"} size={20} />
                <Text className="text-[#1152D4] text-[14px] font-inter">
                  {lawyerSelected.oab_state}
                </Text>
              </View>
              <View className="flex flex-col items-start gap-2">
                <Text className="text-[#1152D4] text-[14px] font-interSemiBold">
                  SOBRE
                </Text>
                <Text className="text-[#fff] text-[14px] font-interRegular">
                  {lawyerSelected.bio}
                </Text>
              </View>
            </View>
          ) : null}
          <ButtonUI
            children={
              <View className="justify-center items-center flex-1 flex-row gap-2">
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white font-interSemiBold text-[16px]">
                    Solicitar serviço
                  </Text>
                )}
              </View>
            }
            onPress={() => handleSendRequest()}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
        </>
      )}
    </SafeAreaView>
  );
}
