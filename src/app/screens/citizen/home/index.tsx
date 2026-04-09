import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, Alert } from "react-native";
<<<<<<< HEAD
import Logo from "@/assets/svg/icons/logo.svg";
=======
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import Person from "@/assets/svg/icons/person.svg";
import { useRouter } from "expo-router";
<<<<<<< HEAD
import { casesData } from "@/utils/home/cases/data";
import { IDecodedToken } from "@/interfaces/services/token/token";
import Header from "@/components/Header";
import { useAccessTokenStorage } from "@/store/token.store";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();
  const token = useAccessTokenStorage((state) => state.accessToken);
  if (token === null) {
    Alert.alert("Token de acesso não encontrado");
    router.replace("/screens/auth/login");
    return null;
  }
  const decodedToken = jwtDecode<IDecodedToken>(token);

=======
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1 }}
<<<<<<< HEAD
        className="gap-[32px]"
=======
        className=" gap-[32px]"
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
      >
        <Header isFirstPage={true} title="CIDADÃO" isCitizen={true} />

        <View className="mt-[32px] gap-[4px]">
          <Text className="font-interBold text-[30px] text-white">
<<<<<<< HEAD
            Olá, {decodedToken.fullName}!
=======
            Olá, Ricardo!
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
          </Text>
          <Text className="text-[16px] text-[#94A3B8] font-interLight">
            Bem-vindo ao seu painel jurídico.
          </Text>
        </View>
        <View className="w-full h-[219.52px] bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[12px] mt-[32px] px-[16px] pt-[32px] gap-[6.9px] pb-[24px]">
          <Text className="text-[20px] text-white font-interSemiBold">
            Novo Problema Jurídico?
          </Text>
          <Text className="text-[14px] mb-[18px] text-[#94A3B8] font-interRegular">
            Nossos especialistas estão prontos para analisar seu caso agora
            mesmo.
          </Text>
          <ButtonUI
            children={
              <View className="px-[24px] py-[16px] justify-between items-center flex-row gap-[8px]">
                <Text className="text-white font-interSemiBold text-[14px]">
                  Relatar Novo Caso
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </View>
            }
            onPress={() => router.replace("/screens/citizen/home/newRequest")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
        </View>
        <View className="gap-[16px] items-center w-full">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-white text-[18px] font-interSemiBold">
              Meus Casos
            </Text>
<<<<<<< HEAD
            <ButtonUI
              onPress={() => router.replace("/screens/citizen/home/listCases")}
              children={
                <Text className="font-inter text-[14px] text-[#2563EB]">
                  Ver todos
                </Text>
              }
              gradient={false}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            />
          </View>
          {casesData.slice(0, 2).map((item) => (
            <ButtonUI
              key={item.id}
              onPress={() => router.replace(`/screens/citizen/home/listCases/caseSelected/${item.id}`)}
              gradient={false}
              hover={false}
              iconLeft
              iconName={item.icon}
              status={item.status}
              colorsStatus={item.color}
              children={<Text>{item.title}</Text>}
              paddingButtonStatus={"p-[16px]"}
            />
          ))}
        </View>
        <View
        style={{
=======
            <Text className="font-inter text-[14px] text-[#2563EB]">
              Ver todos
            </Text>
          </View>
          <ButtonUI
            children={
              <Text className="text-white text-[14px] font-inter">
                Ação Trabalhista - XPTO
              </Text>
            }
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            gradient={false}
            hover={false}
            iconLeft={true}
            statusBorder={false}
            status="Em Análise"
            iconName="article"
            paddingButtonStatus={"p-[16px]"}
          />
          <ButtonUI
            children={
              <Text className="text-white text-[14px] font-inter">
                Indenização Danos Morais
              </Text>
            }
            onPress={() => {}}
            gradient={false}
            hover={false}
            iconLeft={true}
            statusBorder={false}
            status="Concluído"
            iconName="verified"
            paddingButtonStatus={"p-[16px]"}
          />
        </View>
        <LinearGradient
          style={{
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.03)",
            height: 225,
            paddingTop: 24,
            paddingHorizontal: 24,
<<<<<<< HEAD
            marginBottom: 128,
          }}>
=======
            paddingBottom: 56,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          colors={["rgba(49, 46, 129,0.4)", "#312E81"]}
        >
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
          <View className="flex-row justify-between">
            <View>
              <Text className="text-[18px] text-white font-interBold">
                Simulador de Audiência
              </Text>
              <Text className="text-[12px] w-[200px] mb-[16px] text-[#94A3B8] font-interRegular">
                Treine seu depoimento com nossa IA antes do dia oficial.
              </Text>
            </View>
            <View className="justify-center rounded-full items-center flex bg-[rgba(255,255,255,0.05)] w-[48px] h-[48px]">
              <Person width={24} height={24} />
            </View>
          </View>
          <ButtonUI
            children={
              <View className=" justify-center items-center flex-1">
                <Text className="text-white font-interSemiBold text-[16px]">
                  Começar treinamento
                </Text>
              </View>
            }
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
<<<<<<< HEAD
          </View>
=======
        </LinearGradient>
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
      </SafeAreaView>
    </ScrollView>
  );
}
