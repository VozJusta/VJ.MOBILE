import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import ConnectionIllustration from "../../assets/png/ConnectionIllustration.png";
import { Text, View, Image } from "react-native";

export const onboardingData = [
    {
        img: <Image source={ConnectionIllustration} />,
        title: (
            <Text className=" font-interBold text-white text-[30px] leading-[36px]">
                Conexão
            </Text>
        ),
        description: (
            <LinearGradient
                style={{ borderRadius: 12 }}
                className="w-full min-h-[200px] flex-col items-center "
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
                <View className=" flex-col items-center mt-3">


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
                <Text className="font-interLight text-[#D1D5DB] text-4 text-center pt-4 mx-4">
                    Unimos cidadãos e advogados especialistas com transparência e agilidade direta via <Text className="font-interSemiBold text-EconGreen900">WhatsApp</Text>.
                </Text>
            </LinearGradient>
        )
    }
]