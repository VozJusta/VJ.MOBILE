import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import TermsTitle from "@/components/terms/TermsTitle";
import TermsContent from "@/components/terms/TermsContent";
import { termsContents, termsTitles } from "@/utils/screens/shared/terms";

export default function TermsUsage() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} className=" gap-12">
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
  );
}
