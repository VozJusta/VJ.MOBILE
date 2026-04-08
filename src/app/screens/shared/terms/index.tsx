import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";

export default function TermsUsage() {
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-[32px]">
          <Header isFirstPage={false} title="TERMOS DE USO" isCitizen={false} />



        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
