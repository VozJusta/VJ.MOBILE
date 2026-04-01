import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import ButtonUI from "@/ui/ButtonUI";
import { ICaseSelectProps } from "@/interfaces/interfaces";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IButtonCases } from "@/interfaces/utils/cases/interface";
import { casesData } from "@/utils/home/cases/data";
import { MaterialIcons } from "@expo/vector-icons";
import Report from "@/assets/svg/reportIcon.svg"

export default function CaseSelected() {
    const router = useRouter()
  const local = useLocalSearchParams();
  console.log(local.id);
  const caseSelected: IButtonCases[] = local.id
    ? casesData.filter((item) => item.id === Number(local.id))
    : [];
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 20, paddingHorizontal: 24, gap: 24 }}
      >
        <View className="flex-row items-center gap-[16px]">
          <ButtonUI
            onPress={() => router.replace("/screens/citizen/home")}
            gradient={false}
            hover={false}
            size="h-[40px] w-[40px]"
            goBack={true}
            iconLeft={false}
            paddingButtonStatus={""}
          />
          <Text className="text-[18px] text-white font-interBold">
            {caseSelected[0].title}
          </Text>
        </View>
        <View className="py-[24px] pl-[24px] pr-[37px] bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">
          <Text className="text-[14px] font-interSemiBold text-[#2563EB]">
            Status Atual
          </Text>
          <View className="flex-row gap-[8px] items-center ">
            <Text className="text-[24px] font-interBold text-white">
              EM ANÁLISE PELA IA
            </Text>
            <View className="w-[12px] h-[12px] rounded-full bg-[#2563EB]"></View>
          </View>
          <Text className="text-[14px] text-[#94A3B8] font-interRegular">
            Nossa inteligência artificial está processando as provas anexadas.
          </Text>
        </View>
        <View className="flex-col gap-[16px]">
          <Text className="text-[14px] text-[#94A3B8] uppercase font-interSemiBold">
            Evolução do Caso
          </Text>
          <View className="py-[24px] gap-[16px] pl-[24px] pr-[37px] bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">
            <View className="flex-row gap-[16px]">
              <View className="flex-col items-center gap-[4px]">
                <View className="w-[24px] h-[24px] bg-[#10B981] rounded-full items-center justify-center">
                  <MaterialIcons name="check" size={16} color="white" />
                </View>
                <View className="w-[2px] h-[34px] bg-[rgba(16,185,129,0.3)]"></View>
              </View>
              <View className="flex-col items-start">
                <Text className="text-[16px] font-inter text-white">
                  Relato Enviado
                </Text>
                <Text className="text-[12px] font-interRegular text-[#64748B]">
                  12 Out, 2023 - 14:30
                </Text>
              </View>
            </View>
            <View className="flex-row gap-[16px]">
              <View className="flex-col items-center gap-[4px]">
                <View className="w-[24px] h-[24px] bg-[#10B981] rounded-full items-center justify-center">
                  <MaterialIcons name="check" size={16} color="white" />
                </View>
                <View className="w-[2px] h-[34px] bg-[rgba(16,185,129,0.3)]"></View>
              </View>
              <View className="flex-col items-start">
                <Text className="text-[16px] font-inter text-white">
                  Provas Validadas{" "}
                </Text>
                <Text className="text-[12px] font-interRegular text-[#64748B]">
                  14 Out, 2023 - 09:15{" "}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-[16px]">
              <View className="flex-col items-center gap-[4px]">
                <View className="w-[24px] h-[24px] bg-[#2563EB] rounded-full items-center justify-center">
                  <View className="w-[8px] h-[8px] bg-white rounded-full"></View>
                </View>
              </View>
              <View className="flex-col items-start">
                <Text className="text-[16px] font-inter text-[#2563EB]">
                  Análise Técnica{" "}
                </Text>
                <Text className="text-[12px] font-interRegular uppercase text-[#64748B]">
                  Em processamento...{" "}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-col uppercase gap-[16px]">
            <Text className="text-[14px] text-[#94A3B8] font-interSemiBold">
              Resumo do Relato
            </Text>
            <View className="pl-[20px] pt-[19px] pb-[20.75px] pr-[17px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.7)] rounded-[16px] justify-center items-center">
              <Text className="font-interRegular text-[14px] text-[#CBD5E1]">
                "Fui demitido sem justa causa da empresa XPTO Tecnologia após 3
                anos de serviço. Reclamo o não pagamento de horas extras
                acumuladas nos últimos 6 meses e irregularidades no depósito do
                FGTS..."
              </Text>
            </View>
          </View>
          <View className="flex-col gap-[16px] w-full">
            <View className="flex-row justify-between items-center w-full">
              <Text className="uppercase text-[14px] font-interSemiBold text-[#94A3B8]">
                Documentos
              </Text>
              <Text className=" text-[12px] font-inter text-[#2563EB]">
                4 anexos
              </Text>
            </View>
            <View className="flex-col gap-[8px]">
              <View className="bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] p-[16px] rounded-[16px] justify-between items-center flex-row">
                <View className="flex-row gap-[12px] items-center">
                  <View className="bg-[rgba(249,115,22,0.2)] rounded-[12px] w-[40px] justify-center items-center h-[40px]">
                    <MaterialIcons
                      name="description"
                      color={"#F97316"}
                      size={24}
                    />
                  </View>
                  <View className="flex-col">
                    <Text className="text-[14px] text-[#F1F5F9] font-inter">
                      Contrato_Trabalho.pdf
                    </Text>
                    <Text className="text-[12px] text-[#94A3B8] font-interRegular">
                      PDF • 2.4 MB
                    </Text>
                  </View>
                </View>
                <MaterialIcons name="download" color={"#64748B"} size={20} />
              </View>
              <View className="bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] p-[16px] rounded-[16px] justify-between items-center flex-row">
                <View className="flex-row gap-[12px] items-center">
                  <View className="bg-[rgba(59,130,246,0.2)] rounded-[12px] w-[40px] justify-center items-center h-[40px]">
                    <MaterialIcons name="image" color={"#3B82F6"} size={24} />
                  </View>
                  <View className="flex-col">
                    <Text className="text-[14px] text-[#F1F5F9] font-inter">
                      Screenshot_Ponto.png
                    </Text>
                    <Text className="text-[12px] text-[#94A3B8] font-interRegular">
                      PNG • 840 KB
                    </Text>
                  </View>
                </View>
                <MaterialIcons name="visibility" color={"#64748B"} size={20} />
              </View>
            </View>
            <View className="w-full mt-[9px] mb-[24px]">
              <ButtonUI
                onPress={function (): void {
                  throw new Error("Function not implemented.");
                }}
                children={
                    <View className="flex-1 justify-center items-center gap-[8px] flex-row">
                        <Report width={24} height={24}/>
                        <Text className="font-interSemiBold text-[16px] text-white">
                            Baixar Relatório
                        </Text>
                    </View>
                }
                gradient={true}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
