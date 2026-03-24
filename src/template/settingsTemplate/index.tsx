import Logo from "@/assets/svg/icons/logo.svg";
import {
  ISettingsItem,
  ISettingsTemplateProps,
} from "@/interfaces/template/settingsTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsRow({ item, isLast }: { item: ISettingsItem; isLast: boolean }) {
  const isLinkItem = item.type === "link";

  return (
    <View className={`${!isLast ? "border-b border-white/5" : ""}`}>
      <Pressable
        className="h-[64px] flex-row items-center justify-between px-[16px]"
        onPress={isLinkItem ? item.onPress : undefined}
        disabled={!isLinkItem}
      >
        <View className="flex-row items-center gap-[12px]">
          <MaterialIcons name={item.icon} size={21} color="#E2E8F0" />
          <Text className="text-[#F1F5F9] text-[18px] font-interRegular">
            {item.label}
          </Text>
        </View>

        {item.type === "switch" ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: "#334155", true: "#135BEC" }}
            thumbColor={item.value ? "#F8FAFC" : "#E2E8F0"}
            ios_backgroundColor="#334155"
          />
        ) : (
          <View className="flex-row items-center gap-[10px]">
            {!!item.rightLabel && (
              <Text className="text-[#94A3B8] text-[14px] font-interRegular">
                {item.rightLabel}
              </Text>
            )}
            <View className="w-[28px] h-[28px] rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <MaterialIcons name="chevron-right" size={18} color="#CBD5E1" />
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default function SettingsTemplate({
  title,
  onBack,
  sections,
  versionLabel,
  supportCard,
}: ISettingsTemplateProps) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      colors={["#020617", "#052F5F"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        >
          <View className="flex-row justify-between items-center pt-2 pb-5">
            <ButtonUI
              goBack
              size="h-[40px] w-[40px]"
              onPress={onBack}
              gradient={false}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            />
            <Text className="text-[#E2E8F0] uppercase tracking-[2px] text-[14px] font-interMedium">
              {title}
            </Text>
            <Logo width={40} height={29} />
          </View>

          <View className="gap-[18px]">
            {sections.map((section) => (
              <View key={section.id} className="gap-[10px]">
                <Text className="uppercase tracking-[2px] text-[#94A3B8] text-[11px] font-interBold">
                  {section.title}
                </Text>

                <View className="bg-[rgba(15,23,42,0.7)] border border-[rgba(255,255,255,0.1)] rounded-[22px] overflow-hidden">
                  {section.items.map((item, index) => (
                    <SettingsRow
                      key={item.id}
                      item={item}
                      isLast={index === section.items.length - 1}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>

          {!!versionLabel && (
            <Text className="text-[#64748B] text-[13px] font-interRegular text-center mt-[24px] mb-[20px]">
              {versionLabel}
            </Text>
          )}

          {!!supportCard && (
            <View className="p-[1px] rounded-[18px] bg-[#135BEC]/70 mb-2">
              <View className="rounded-[18px] bg-[rgba(2,6,23,0.88)] px-[14px] py-[16px] flex-row items-center justify-between">
                <View className="flex-row items-center gap-[12px]">
                  <View className="w-[40px] h-[40px] rounded-full bg-[#135BEC]/20 items-center justify-center">
                    <MaterialIcons name="support-agent" size={22} color="#60A5FA" />
                  </View>

                  <View>
                    <Text className="text-white text-[18px] font-interBold">
                      {supportCard.title}
                    </Text>
                    <Text className="text-[#94A3B8] text-[13px] font-interRegular">
                      {supportCard.description}
                    </Text>
                  </View>
                </View>

                <ButtonUI
                  onPress={supportCard.onPress}
                  gradient={false}
                  hover={false}
                  bg="bg-transparent"
                  border=""
                  size="w-[30px] h-[30px]"
                  iconLeft={false}
                  paddingButtonStatus={""}
                >
                  <View className="flex-1 items-center justify-center">
                    <MaterialIcons name="chevron-right" size={26} color="#3B82F6" />
                  </View>
                </ButtonUI>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}