import { IGetAnalyticsResponse } from "@/interfaces/services/dashboard/lawyer/analytics";
import { getAnalyticsDashboardLawyer } from "@/services/dashboard/lawyer/analytics";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const useDashboardLawyer = () => {
  const [analyticsData, setAnalyticsData] =
    useState<IGetAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {
    setLoading(true);

    try {
      const response = await getAnalyticsDashboardLawyer();

      if (response.success && response.data) {
        setAnalyticsData(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar analytics",
          text2: response.fields?.[0],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar analytics",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, [analyticsData]);

  return {
    analyticsData,
    loading,
    getAnalytics,
  };
};
