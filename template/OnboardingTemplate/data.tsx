import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import ConnectionIllustration from "../../assets/svg/ConnectionIllustration.svg";
import Hammer from "../../assets/svg/Rammer.svg";
import ContainerImage from "../../assets/svg/Container.svg";
import { Text, View } from "react-native";
import { PageData } from "react-native-onboarding-swiper";

export const onboardingData: PageData[] = [
  {
    image: <ConnectionIllustration width={343} height={256} />,

    title: <></>,
    subtitle: (
      <View className="w-full mt-[61px]">
        <LinearGradient
          style={{
            borderRadius: 12,
            boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.37)",
          }}
          className="w-full  min-h-[200px] flex-col items-center"
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.05)"]}
        >
          <View className="w-full h-full absolute top-0 left-0 backdrop-blur-sm" />
          <LinearGradient
            style={{ height: 4 }}
            className="w-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255, 255, 255, 0.20)",
              "rgba(255,255,255,0)",
            ]}
          ></LinearGradient>
          <View className=" flex-col items-center  mt-3">
            <Text className=" font-interBold text-white text-[30px] leading-[36px]">
              Conexão
            </Text>

            <MaskedView
              maskElement={
                <Text className="font-interBold text-[30px]">
                  Sem Barreiras
                </Text>
              }
            >
              <LinearGradient
                colors={["#135BEC", "#93C5FD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="font-interBold text-[30px] opacity-0">
                  Sem Barreiras
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text className="font-interLight text-[#D1D5DB] text-[16px] text-center pt-4 px-4">
            Unimos cidadãos e advogados especialistas com transparência e
            agilidade direta via{" "}
            <Text className="font-interSemiBold text-EconGreen900">
              WhatsApp
            </Text>
            .
          </Text>
        </LinearGradient>
      </View>
    ),
  },
  {
    image: <ContainerImage width={256} height={256} />,

    title: <></>,
    subtitle: (
      <View className="w-full mt-[61px]">
        <LinearGradient
          style={{
            borderRadius: 12,
            boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.37)",
          }}
          className="w-full rounded-xl min-h-[200px] flex-col items-center"
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.05)"]}
        >
          <View className="w-full h-full absolute top-0 left-0 backdrop-blur-sm" />
          <LinearGradient
            style={{ height: 4 }}
            className="w-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255, 255, 255, 0.20)",
              "rgba(255,255,255,0)",
            ]}
          ></LinearGradient>
          <View className=" flex-col items-center  mt-3">
            <Text className=" font-interBold text-white text-[30px] leading-[36px]">
              Sua História,
            </Text>

            <MaskedView
              maskElement={
                <Text className="font-interBold text-[30px]">
                  Nossa Tradução
                </Text>
              }
            >
              <LinearGradient
                colors={["#135BEC", "#93C5FD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="font-interBold text-[30px] opacity-0">
                  Nossa Tradução
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text className="font-interLight text-[#D1D5DB] text-4 text-center pt-4 px-4">
            Conte o que aconteceu em suas palavras. Nossa IA remove o juridiquês
            e extrai a{" "}
            <Text className="font-interSemiBold text-white">
              essência do seu direito.
            </Text>
          </Text>
        </LinearGradient>
      </View>
    ),
  },
  {
    image: <Hammer width={343} height={320} />,

    title: <></>,
    subtitle: (
      <View className="w-full">
        <LinearGradient
          style={{
            borderRadius: 12,
            boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.37)",
          }}
          className="w-full rounded-xl min-h-[200px] flex-col items-center"
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.05)"]}
        >
          <View className="w-full h-full absolute top-0 left-0 backdrop-blur-sm" />
          <LinearGradient
            style={{ height: 4 }}
            className="w-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255, 255, 255, 0.20)",
              "rgba(255,255,255,0)",
            ]}
          ></LinearGradient>
          <View className=" flex-col items-center  mt-3">
            <Text className=" font-interBold text-white text-[30px] leading-[36px]">
              Simulador de
            </Text>

            <MaskedView
              maskElement={
                <Text className="font-interBold text-[30px]">Audiência IA</Text>
              }
            >
              <LinearGradient
                colors={["#135BEC", "#93C5FD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="font-interBold text-[30px] opacity-0">
                  Audiência IA
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text className="font-interLight text-[#D1D5DB] text-4 text-center pt-4 px-4">
            Chegue preparado para o dia real. Treine suas respostas com nosso{" "}
            <Text className="font-interSemiBold text-white">Juiz virtual </Text>
            e ganhe a confiança que você merece.
          </Text>
        </LinearGradient>
      </View>
    ),
  },
];
