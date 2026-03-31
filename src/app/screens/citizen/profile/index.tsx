import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import { ButtonsProfile } from "@/utils/profile/data";
import ProfileButton from "@/components/ProfileButton";
import Header from "@/components/Header";

export default function ProfileCitizen() {
  const primaryButton = ButtonsProfile[0];
  const secondButton = ButtonsProfile[1];
  const thirdButton = ButtonsProfile[2];
  const fourthButton = ButtonsProfile[3];
  const fifithButton = ButtonsProfile[4];
  return (
    <ScrollView style={{ flex: 1 }} >
    <SafeAreaView
      style={{ flex: 1 }}
      className="px-[16px] gap-[32px]"
    >
      <Header isFirstPage={true} title="PERFIL" />
      <View className="w-full justify-center items-center gap-[16px]">
        <LinearGradient
          style={{
            width: 112,
            height: 112,
            borderRadius: 100,
            position: "relative",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#1D4ED8", "#60A5FA"]}
        >
          <View className=" rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] bg-[#1E293B] justify-center items-center">
            <MaterialIcons name="person" size={48} color={"#8E8E93"} />
          </View>
        </LinearGradient>
        <View className="flex-col justify-center items-center">
          <Text className="font-inter text-[20px] text-[#F1F5F9]">Ricardo</Text>
          <View className="px-[12px] py-[2px] bg-[rgba(25,120,229,0.2)] rounded-full border border-solid border-[rgba(25,120,229,0.3)]">
            <Text className="font-interBold text-[10px] uppercase text-[#1978E5]">
              Membro Premium
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-col gap-[16px] w-full">p
        <View className="flex-col gap-[16px] p-[16px] bg-[rgba(30,40,59,0.4)] rounded-[16] border border-solid border-white/5 justify-center items-center">
          <ProfileButton
            icon={primaryButton.icon}
            colorIcon={primaryButton.colorIcon}
            bgIcon={primaryButton.bgIcon}
            namebutton={primaryButton.namebutton}
            NextButton={primaryButton.NextButton}
            path=""
          />
          <View className="bg-[rgba(255,255,255,0.03)] mt-[4px] w-full h-[1px] mx-[3.5px]"></View>
          <ProfileButton
            icon={secondButton.icon}
            colorIcon={secondButton.colorIcon}
            bgIcon={secondButton.bgIcon}
            namebutton={secondButton.namebutton}
            NextButton={secondButton.NextButton}
            path=""
          />
        </View>
        <View className="flex-col gap-[16px] p-[16px]  bg-[rgba(30,40,59,0.4)] rounded-[16] border border-solid border-white/5 justify-center items-center">
          <ProfileButton
            icon={thirdButton.icon}
            colorIcon={thirdButton.colorIcon}
            bgIcon={thirdButton.bgIcon}
            NextButton={fourthButton.NextButton}
            path="" 
            namebutton={thirdButton.namebutton}          />
          <View className="bg-[rgba(255,255,255,0.03)] mt-[4px] w-full h-[1px] mx-[3.5px]"></View>
          <ProfileButton
            icon={fourthButton.icon}
            colorIcon={fourthButton.colorIcon}
            bgIcon={fourthButton.bgIcon}
            namebutton={fourthButton.namebutton}
            path={""}
            NextButton={fourthButton.NextButton}
          />
        </View>
        <View className="flex-col gap-[16px] p-[16px]  bg-[rgba(30,40,59,0.4)] rounded-[16] border border-solid border-white/5 justify-center items-center">
          <ProfileButton
            icon={fifithButton.icon}
            colorIcon={fifithButton.colorIcon}
            bgIcon={fifithButton.bgIcon}
            namebutton={fifithButton.namebutton}
            path={""}
            NextButton={fifithButton.NextButton}
          />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
