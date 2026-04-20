import { Pressable, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CaseCardProps, CaseStatus } from "@/interfaces/components/CaseCard";
import { STATUS_STYLES } from "@/utils/components/CaseCard";
import { translateStatus } from "@/utils/screens/citizen/home";

export default function CaseCard({
  title,
  status,
  iconName,
  onPress,
}: CaseCardProps) {
  const styles = STATUS_STYLES[status as CaseStatus];

  return (
    <Pressable
      onPress={onPress}
      className="p-[16px] rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] w-full"
    >
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row gap-[16px] items-center">
          <View
            className={`py-[11px] px-[11px] items-center rounded-[12px] ${styles.bg} border border-solid ${styles.border}`}
          >
            <MaterialIcons name={iconName} size={24} color={styles.icon} />
          </View>

          <View className="flex-col gap-[6px]">
            <Text className="text-white font-interSemiBold text-[14px]">
              {title}
            </Text>

            <View
              className={`py-[4px] px-[10px] flex-row justify-center items-center gap-[8px] rounded-full self-start ${styles.bg} border border-solid ${styles.border}`}
            >
              <View
                className={`min-w-[6px] min-h-[6px] rounded-full ${styles.dot}`}
              />
              <Text
                className={`font-interBold text-[10px] uppercase ${styles.label}`}
              >
                {translateStatus(status)}
              </Text>
            </View>
          </View>
        </View>

        <MaterialIcons
          style={{ transform: [{ rotate: "-180deg" }] }}
          name="arrow-back-ios"
          size={14}
          color="#64748B"
        />
      </View>
    </Pressable>
  );
}
