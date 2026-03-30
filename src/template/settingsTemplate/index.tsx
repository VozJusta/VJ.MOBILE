import Logo from "@/assets/svg/icons/logo.svg";
import {
  ISettingsItem,
  ISettingsSection,
  ISettingsTemplateProps,
} from "@/interfaces/template/settingsTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsRow({ item, isLast }: { item: ISettingsItem; isLast: boolean }) {
  const isLinkItem = item.type === "link";
  const hasDescription = !!item.description;
  const isDanger = item.variant === "danger";

  return (
    <View className={`${!isLast ? "border-b border-white/5" : ""}`}>
      <Pressable
        className={`flex-row items-center justify-between px-[16px] ${hasDescription ? "py-[14px]" : "h-[64px]"}`}
        style={{ alignItems: "center" }}
        onPress={isLinkItem ? item.onPress : undefined}
        disabled={!isLinkItem}
      >
        <View className="flex-1 flex-row items-center gap-[12px] pr-[14px]">
          <MaterialIcons name={item.icon} size={21} color={isDanger ? "#F87171" : "#E2E8F0"} />

          <View className="flex-1">
            <Text className={`text-[18px] font-interRegular ${isDanger ? "text-[#F87171]" : "text-[#F1F5F9]"}`}>
              {item.label}
            </Text>

            {!!item.description && (
              <Text className="text-[#94A3B8] text-[14px] font-interRegular mt-[2px]">
                {item.description}
              </Text>
            )}
          </View>
        </View>

        {item.type === "switch" ? (
          <View className="h-full justify-center" style={{ justifyContent: "center", alignItems: "center" }}>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: "#334155", true: "#135BEC" }}
              thumbColor={item.value ? "#F8FAFC" : "#E2E8F0"}
              ios_backgroundColor="#334155"
              style={Platform.OS === "ios" ? { marginTop: 0 } : undefined}
            />
          </View>
        ) : item.type === "link" ? (
          <View className="flex-row items-center gap-[10px]">
            {!!item.rightLabel && (
              <Text className="text-[#94A3B8] text-[14px] font-interRegular">{item.rightLabel}</Text>
            )}

            <View className="w-[28px] h-[28px] rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <MaterialIcons name="chevron-right" size={18} color="#CBD5E1" />
            </View>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

function SettingsCard({ item }: { item: ISettingsItem }) {
  const isLinkItem = item.type === "link";
  const isDanger = item.variant === "danger";

  return (
    <View className={`rounded-[22px] overflow-hidden border ${isDanger ? "border-red-500/40" : "border-white/10"}`}>
      <Pressable
        className={`px-[16px] py-[16px] flex-row items-center justify-between ${isDanger ? "bg-[rgba(28,11,18,0.85)]" : "bg-[rgba(15,23,42,0.7)]"}`}
        onPress={isLinkItem ? item.onPress : undefined}
        disabled={!isLinkItem}
      >
        <View className="flex-1 flex-row items-start gap-[12px] pr-[14px]">
          <View className={`w-[38px] h-[38px] rounded-full items-center justify-center ${isDanger ? "bg-red-500/20" : "bg-[#135BEC]/20"}`}>
            <MaterialIcons name={item.icon} size={20} color={isDanger ? "#F87171" : "#60A5FA"} />
          </View>

          <View className="flex-1">
            <Text className={`text-[18px] font-interMedium ${isDanger ? "text-[#F87171]" : "text-[#F1F5F9]"}`}>
              {item.label}
            </Text>

            {!!item.description && (
              <Text className="text-[#94A3B8] text-[14px] font-interRegular mt-[4px]">
                {item.description}
              </Text>
            )}
          </View>
        </View>

        {item.type === "switch" ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: "#334155", true: "#135BEC" }}
            thumbColor={item.value ? "#F8FAFC" : "#E2E8F0"}
            ios_backgroundColor="#334155"
            style={Platform.OS === "ios" ? { marginTop: 0 } : undefined}
          />
        ) : item.type === "link" ? (
          <MaterialIcons name="chevron-right" size={22} color="#94A3B8" />
        ) : null}
      </Pressable>
    </View>
  );
}

function SettingsSectionBlock({ section }: { section: ISettingsSection }) {
  const variant = section.variant ?? "grouped";

  return (
    <View className="gap-[10px]">
      <Text className="uppercase tracking-[2px] text-[#94A3B8] text-[11px] font-interBold">
        {section.title}
      </Text>

      {variant === "stacked" ? (
        <View className="gap-[10px]">
          {section.items.map((item) => (
            <SettingsCard key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <View className="bg-[rgba(15,23,42,0.7)] border border-[rgba(255,255,255,0.1)] rounded-[22px] overflow-hidden">
          {section.items.map((item, index) => (
            <SettingsRow key={item.id} item={item} isLast={index === section.items.length - 1} />
          ))}
        </View>
      )}
    </View>
  );
}

export default function SettingsTemplate({
  title,
  description,
  onBack,
  sections,
  versionLabel,
  supportCard,
  dangerCard,
}: ISettingsTemplateProps) {
  return (
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

        {!!description && (
          <Text className="text-[#B8C5DA] text-[20px] leading-[28px] font-interRegular mb-[20px]">
            {description}
          </Text>
        )}

        <View className="gap-[18px]">
          {sections.map((section) => (
            <SettingsSectionBlock key={section.id} section={section} />
          ))}
        </View>

        {!!versionLabel && (
          <Text className="text-[#64748B] text-[13px] font-interRegular text-center mt-[32px] mb-[45px]">
            {versionLabel}
          </Text>
        )}

        {!!supportCard && (
          <View className="p-[1px] rounded-[18px] bg-[#135BEC]/70 mb-2 mt-[8px]">
            <View className="rounded-[18px] bg-[rgba(2,6,23,0.88)] px-[14px] py-[16px] flex-row items-center justify-between">
              <View className="flex-row items-center gap-[12px] flex-1 pr-[10px]">
                <View className="w-[40px] h-[40px] rounded-full bg-[#135BEC]/20 items-center justify-center">
                  <MaterialIcons name={supportCard.icon ?? "support-agent"} size={22} color="#60A5FA" />
                </View>

                <View className="flex-1">
                  <Text className="text-white text-[18px] font-interBold">{supportCard.title}</Text>
                  <Text className="text-[#94A3B8] text-[13px] font-interRegular">{supportCard.description}</Text>
                </View>
              </View>

              <ButtonUI
                onPress={supportCard.onPress ?? (() => {})}
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

        {!!dangerCard && (
          <View className="rounded-[26px] border border-red-500/40 bg-[rgba(28,11,18,0.9)] px-[14px] py-[14px] mt-[10px]">
            <View className="flex-row items-center gap-[10px]">
              <View className="w-[34px] h-[34px] rounded-full bg-red-500/20 items-center justify-center">
                <MaterialIcons name={dangerCard.icon ?? "warning-amber"} size={19} color="#F87171" />
              </View>
              <Text className="text-[#F87171] text-[18px] font-interBold">{dangerCard.title}</Text>
            </View>

            <Text className="text-[#9CA3AF] text-[14px] leading-[22px] font-interRegular mt-[12px]">
              {dangerCard.description}
            </Text>

            <ButtonUI
              onPress={dangerCard.onPress ?? (() => {})}
              gradient={false}
              hover={false}
              bg="bg-[#EA2027]"
              border="border border-[#EA2027]"
              size="h-[48px] w-full"
              iconLeft={false}
              paddingButtonStatus={"px-[20px]"}
            >
              <View className="w-full h-full items-center justify-center">
                <Text className="text-white font-interBold text-[16px] uppercase tracking-[0.7px]">
                  {dangerCard.buttonLabel}
                </Text>
              </View>
            </ButtonUI>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
