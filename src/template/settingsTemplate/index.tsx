import Logo from "@/assets/svg/icons/logo.svg";
import DangerAlertIcon from "@/assets/svg/icons/danger-alert.svg";
import Header from "@/components/Header";
import { ISettingsItem, ISettingsSection, ISettingsTemplateProps } from "@/interfaces/template/configTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

function getHelpIconPalette(itemId: string) {
  switch (itemId) {
    case "ai-overview":
      return { bg: "rgba(17, 85, 170, 0.22)", border: "rgba(67, 141, 231, 0.32)", color: "#44A4FF" };
    case "plans-billing":
      return { bg: "rgba(180, 132, 28, 0.2)", border: "rgba(233, 172, 41, 0.36)", color: "#F4B72D" };
    case "process-questions":
      return { bg: "rgba(11, 140, 136, 0.2)", border: "rgba(47, 185, 168, 0.34)", color: "#2DDFC4" };
    case "security-data":
      return { bg: "rgba(170, 33, 86, 0.2)", border: "rgba(243, 84, 130, 0.34)", color: "#FF4F8D" };
    case "getting-started":
      return { bg: "rgba(96, 62, 196, 0.22)", border: "rgba(150, 110, 255, 0.36)", color: "#A78BFA" };
    default:
      return { bg: "rgba(17, 85, 170, 0.22)", border: "rgba(67, 141, 231, 0.32)", color: "#44A4FF" };
  }
}

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

function SettingsCard({ item, isPrivacy, isHelp }: { item: ISettingsItem; isPrivacy: boolean; isHelp: boolean }) {
  const isLinkItem = item.type === "link";
  const isDanger = item.variant === "danger";
  const showIconBubble = !(isPrivacy && item.type === "switch");
  const isPartnerSharingCard = isPrivacy && item.id === "partner-sharing";
  const helpIconPalette = isHelp ? getHelpIconPalette(item.id) : undefined;

  return (
    <View
      className={`overflow-hidden border ${isPrivacy ? "rounded-[34px] border-[#29456E]/45" : isHelp ? "rounded-[20px] border-[#2A4568]/70" : "rounded-[22px]"} ${isDanger ? "border-red-500/40" : isHelp ? "" : "border-white/10"}`}
    >
      <Pressable
        className={`px-[18px] flex-row items-center justify-between ${isPartnerSharingCard ? "py-[19px]" : "py-[16px]"} ${isDanger ? "bg-[rgba(28,11,18,0.85)]" : isPrivacy ? "bg-[rgba(8,27,56,0.84)]" : isHelp ? "bg-[rgba(25,36,51,0.6)]" : "bg-[rgba(15,23,42,0.7)]"}`}
        style={
          isHelp
            ? {
                shadowColor: "#061B36",
                shadowOpacity: 0.25,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
              }
            : undefined
        }
        onPress={isLinkItem ? item.onPress : undefined}
        disabled={!isLinkItem}
      >
        <View className="flex-1 flex-row items-start gap-[11px] pr-[14px]">
          {showIconBubble && (
            <View
              className={`${isPrivacy ? "w-[42px] h-[42px]" : "w-[38px] h-[38px]"} items-center justify-center ${isHelp ? "rounded-[12px]" : "rounded-full"} ${isDanger ? "bg-red-500/20" : "bg-[#135BEC]/20"}`}
              style={
                isHelp
                  ? {
                      backgroundColor: helpIconPalette?.bg,
                      borderWidth: 1,
                      borderColor: helpIconPalette?.border,
                    }
                  : undefined
              }
            >
              <MaterialIcons name={item.icon} size={isPrivacy ? 20 : 20} color={isDanger ? "#F87171" : isHelp ? helpIconPalette?.color : "#60A5FA"} />
            </View>
          )}

          <View className="flex-1">
            <Text className={`${isPrivacy ? "text-[16px]" : isHelp ? "text-[17px]" : "text-[18px]"} font-interMedium ${isDanger ? "text-[#F87171]" : "text-[#F1F5F9]"}`}>
              {item.label}
            </Text>

            {!!item.description && (
              <Text className={`${isPrivacy ? "text-[13px] leading-[21px]" : isHelp ? "text-[13px]" : "text-[14px]"} text-[#94A3B8] font-interRegular mt-[5px]`}>
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
            style={Platform.OS === "ios" ? { marginTop: 0, transform: [{ scaleX: 1.03 }, { scaleY: 1.03 }] } : undefined}
          />
        ) : item.type === "link" ? (
          <MaterialIcons name="chevron-right" size={24} color={isHelp ? "#5F7494" : "#7F95B8"} />
        ) : null}
      </Pressable>
    </View>
  );
}

function SettingsSectionBlock({ section, isPrivacy, isHelp }: { section: ISettingsSection; isPrivacy: boolean; isHelp: boolean }) {
  const variant = section.variant ?? "grouped";

  return (
    <View className={isPrivacy ? "  gap-[13px]" : "gap-[10px]"}>
      <Text className={`uppercase tracking-[2.3px] text-[11px] font-interBold ${isPrivacy ? "text-[#7E96B9]" : isHelp ? "text-[#1B99EB]" : "text-[#94A3B8]"}`}>
        {section.title}
      </Text>

      {variant === "stacked" ? (
        <View className={isPrivacy ? "gap-[14px]" : "gap-[10px]"}>
          {section.items.map((item) => (
            <SettingsCard key={item.id} item={item} isPrivacy={isPrivacy} isHelp={isHelp} />
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
  searchPlaceholder,
  templateVariant = "default",
  onBack,
  sections,
  versionLabel,
  supportCard,
  dangerCard,
}: ISettingsTemplateProps) {
  const isPrivacy = templateVariant === "privacy";
  const isHelp = templateVariant === "help";
  const insets = useSafeAreaInsets();
  const helpSupportBottomOffset =  + insets.bottom;

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isPrivacy ? 0 : isHelp ? 220 : 28,
          paddingTop: isPrivacy || isHelp ? 4 : 0,
        }}
      >
        <View className="mb-[32px] px-[0]">
          <Header 
            isCitizen={true} 
            title={title.toUpperCase()} 
            isFirstPage={false}
          />
        </View>

        {!!description && (
          <Text className={`${isPrivacy ? "text-[#AFC3DF] text-[16px] leading-[30px] mb-[28px]" : "text-[#B8C5DA] text-[20px] leading-[28px] mb-[20px]"} font-interRegular`}>
            {description}
          </Text>
        )}

        {isHelp && (
          <View className="mb-[22px]">
            <View className="rounded-[32px] border border-[#274465] bg-[rgba(7,22,44,0.86)] h-[72px] px-[20px] flex-row items-center gap-[10px]">
              <MaterialIcons name="search" size={22} color="#7A8FAA" />
              <TextInput
                placeholder={searchPlaceholder ?? "Busque por duvidas..."}
                placeholderTextColor="#7A8FAA"
                className="flex-1 text-[20px] text-[#D7E8FF] font-interRegular"
              />
            </View>
          </View>
        )}

        <View className={isPrivacy ? "gap-[26px]" : "gap-[18px]"}>
          {sections.map((section) => (
            <SettingsSectionBlock key={section.id} section={section} isPrivacy={isPrivacy} isHelp={isHelp} />
          ))}
        </View>

        {!!versionLabel && (
          <Text className="text-[#64748B] text-[13px] font-interRegular text-center mt-[32px] mb-[45px]">
            {versionLabel}
          </Text>
        )}

        {!!supportCard && !isHelp && (
          <View className={isHelp ? "mb-2 mt-[20px]" : "p-[1px] rounded-[18px] bg-[#135BEC]/70 mb-2 mt-[8px]"}>
            {isHelp ? (
              <Pressable
                onPress={supportCard.onPress ?? (() => {})}
                className="rounded-[18px] overflow-hidden border border-[#4D99ED]/45"
              >
                <LinearGradient
                  colors={["#2B91F6", "#2A7EE8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ paddingHorizontal: 20, paddingVertical: 18 }}
                >
                  <View className="flex-row items-center justify-center gap-[10px]">
                    <MaterialIcons name={supportCard.icon ?? "support-agent"} size={25} color="#FFFFFF" />
                    <Text className="text-white text-[20px] font-interBold">{supportCard.title}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ) : (
              <View className="rounded-[18px] bg-[rgba(2,6,23,0.88)] px-[14px] py-[16px] flex-row items-center justify-between">
              <View className="flex-row items-center gap-[12px] flex-1 pr-[10px]">
                <View className={`items-center justify-center ${isHelp ? "w-[36px] h-[36px]" : "w-[40px] h-[40px] rounded-full bg-[#135BEC]/20"}`}>
                  <MaterialIcons name={supportCard.icon ?? "support-agent"} size={isHelp ? 28 : 22} color={isHelp ? "#FFFFFF" : "#60A5FA"} />
                </View>

                <View className="flex-1">
                  <Text className={`${isHelp ? "text-white text-[20px]" : "text-white text-[18px]"} font-interBold`}>{supportCard.title}</Text>
                  {!!supportCard.description && (
                    <Text className={`${isHelp ? "text-white/75 text-[12px]" : "text-[#94A3B8] text-[13px]"} font-interRegular`}>
                      {supportCard.description}
                    </Text>
                  )}
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
                  <MaterialIcons name="chevron-right" size={26} color={isHelp ? "#FFFFFF" : "#3B82F6"} />
                </View>
              </ButtonUI>
              </View>
            )}
          </View>
        )}

        {!!dangerCard && (
          <View
            className={`border bg-[rgba(8,11,31,0.97)] ${isPrivacy ? "rounded-[36px] border-[#F0455A]/45 p-[20px] mt-[32px] mb-0" : "rounded-[26px] border-red-500/40 p-[14px] mt-[10px]"}`}
            style={
              isPrivacy
                ? {
                    shadowColor: "#FF3A55",
                    shadowOpacity: 0.35,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 0 },
                    elevation: 16,
                  }
                : undefined
            }
          >
            <View className="flex-row items-center gap-[12px]">
              <View className={`${isPrivacy ? "w-[40px] h-[40px]" : "w-[34px] h-[34px]"} rounded-full bg-red-500/20 items-center justify-center`}>
                <DangerAlertIcon width={isPrivacy ? 18 : 16} height={isPrivacy ? 16 : 14} />
              </View>
              <Text className={`${isPrivacy ? "text-[18px]" : "text-[18px]"} text-[#FF5E69] font-interBold`}>{dangerCard.title}</Text>
            </View>

            <Text className={`${isPrivacy ? "text-[14px] text-[#FECACA]/60 leading-[24px]  mt-[15px] mb-[32px]" : "text-[14px] leading-[22px] mt-[12px]"} text-[#9CA3AF] font-interRegular`}>
              {dangerCard.description}
            </Text>

            <ButtonUI
              onPress={() => router.push("/screens/shared/terminate-account")}
              gradient={false}
              hover={false}
              bg="bg-[#EA2027]"
              border="border border-[#F04444]"
              size={isPrivacy ? "h-[56px] w-full rounded-[16px]" : "h-[48px] w-full"}
              iconLeft={false}
              paddingButtonStatus={"px-[20px]"}
            >
              <View className="w-full h-full items-center justify-center">
                <Text className={`${isPrivacy ? "text-[16px] tracking-[0.8px]" : "text-[16px] tracking-[0.7px]"} text-white font-interBold uppercase`}>
                  {dangerCard.buttonLabel}
                </Text>
              </View>
            </ButtonUI>
          </View>
        )}
      </ScrollView>

      {!!supportCard && isHelp && (
        <View
          className="absolute left-4 right-4"
          style={{ bottom: helpSupportBottomOffset }}
        >
          <Pressable
            onPress={supportCard.onPress ?? (() => {})}
            className="rounded-[18px] overflow-hidden border border-[#4D99ED]/45"
          >
            <LinearGradient
              colors={["#2B91F6", "#2A7EE8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingHorizontal: 20, paddingVertical: 18 }}
            >
              <View className="flex-row items-center justify-center gap-[10px]">
                <MaterialIcons name={supportCard.icon ?? "support-agent"} size={25} color="#FFFFFF" />
                <Text className="text-white text-[20px] font-interBold">{supportCard.title}</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
