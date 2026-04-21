import { IGetAnalyticsResponse } from "@/interfaces/services/dashboard/lawyer/analytics";
import { IGetOperationalStatsResponse } from "@/interfaces/services/dashboard/lawyer/operationalStas";
import { getAnalyticsDashboardLawyer } from "@/services/dashboard/lawyer/analytics";
import { getOperationalStatsDashboard } from "@/services/dashboard/lawyer/operationalStats";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const useDashboardLawyer = () => {
  const [analyticsData, setAnalyticsData] =
    useState<IGetAnalyticsResponse | null>(null);
  const [operationalStats, setOperationalStats] =
    useState<IGetOperationalStatsResponse | null>(null);
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

  const getOperationalStats = async () => {
    setLoading(true);

    try {
      const response = await getOperationalStatsDashboard();

      if (response.success && response.data) {
        setOperationalStats(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar estatísticas operacionais",
          text2: response.fields?.[0],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar estatísticas operacionais",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([getAnalytics(), getOperationalStats()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  return {
    analyticsData,
    loading,
    getAnalytics,
    operationalStats,
    getOperationalStats,
  };
};
