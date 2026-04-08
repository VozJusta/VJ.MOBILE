import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { TermsTitleProps } from "@/interfaces/components/terms/TermsTitle";
import TermsContent, {
  TermsContentProps,
} from "@/components/terms/TermsContent";
import TermsTitle from "@/components/terms/TermsTitle";
import { termsContents, termsTitles } from "./data";

export default function TermsUsage() {
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-12">
          <Header isFirstPage={false} title="TERMOS DE USO" isCitizen={false} />

          <View className=" gap-3">
            <Text className="font-interBold text-[30px] text-white">
              Termos de uso
            </Text>
            <Text className="text-[16px] text-[#94A3B8] font-interLight">
              Leia atentamente os termos de utilização e as políticas de
              privacidade que regem a plataforma.
            </Text>
          </View>

          {termsTitles.map((title, index) => (
            <View key={index} className="flex flex-col gap-6">
              <TermsTitle {...title} />

              {termsContents
                .filter((content) => content.numberSection === title.number)
                .map((content, index) => (
                  <TermsContent key={index} {...content} />
                ))}
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
