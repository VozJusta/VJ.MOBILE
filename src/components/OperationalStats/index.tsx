import { View } from "react-native";
import OperationalStatsCard from "../OperationalStatsCard";
import { operationalStatsData } from "./data";

export default function OperationalStats() {
  return (
    <View className="flex flex-col gap-6 p-6 bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl">
      <View className="flex flex-col gap-4">
        <View className="flex flex-row gap-3">
          <OperationalStatsCard {...operationalStatsData[0]} />
          <OperationalStatsCard {...operationalStatsData[1]} />
        </View>
        <View className="flex flex-row">
          <OperationalStatsCard {...operationalStatsData[2]} />
        </View>
      </View>
    </View>
  );
}
