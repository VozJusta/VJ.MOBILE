import { View } from "react-native";
import OperationalStatsCard from "../OperationalStatsCard";
import { operationalStatsData } from "./data";
import { IGetOperationalStatsResponse } from "@/interfaces/services/dashboard/lawyer/operationalStas";

export default function OperationalStats({
  accepted,
  pending,
  refused,
}: Partial<IGetOperationalStatsResponse>) {
  return (
    <View className="flex flex-col gap-6 p-6 bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl">
      <View className="flex flex-col gap-4">
        <View className="flex flex-row gap-3">
          <OperationalStatsCard
            {...operationalStatsData[0]}
            stat={accepted?.toString() || "0"}
          />
          <OperationalStatsCard
            {...operationalStatsData[1]}
            stat={refused?.toString() || "0"}
          />
        </View>
        <View className="flex flex-row">
          <OperationalStatsCard
            {...operationalStatsData[2]}
            stat={pending?.toString() || "0"}
          />
        </View>
      </View>
    </View>
  );
}
