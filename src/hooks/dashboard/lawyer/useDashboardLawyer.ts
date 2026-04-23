import { IGetAnalyticsResponse } from "@/interfaces/services/dashboard/lawyer/analytics";
import { IHighRelevanceResponse } from "@/interfaces/services/dashboard/lawyer/high-relevance";
import { IGetOperationalStatsResponse } from "@/interfaces/services/dashboard/lawyer/operationalStats";
import { getAnalyticsDashboardLawyer } from "@/services/dashboard/lawyer/analytics";
import { getHighRelevanceDashboardLawyer } from "@/services/dashboard/lawyer/high-relevance";
import { getOperationalStatsDashboard } from "@/services/dashboard/lawyer/operationalStats";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const useDashboardLawyer = () => {
  const [analyticsData, setAnalyticsData] =
    useState<IGetAnalyticsResponse | null>(null);
  const [operationalStats, setOperationalStats] =
    useState<IGetOperationalStatsResponse | null>(null);
  const [highRelevanceCases, setHighRelevanceCases] = useState<
    IHighRelevanceResponse[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {
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
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar analytics",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  const getOperationalStats = async () => {
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
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar estatísticas operacionais",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  const getHighRelevanceCases = async () => {
    try {
      const response = await getHighRelevanceDashboardLawyer();
      if (response.success && response.data) {
        setHighRelevanceCases(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar casos de alta relevância",
          text2: response.message,
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar casos de alta relevância",
        text2: "Tente novamente mais tarde",
      });
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([getAnalytics(), getOperationalStats(), getHighRelevanceCases()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  return {
    analyticsData,
    loading,
    operationalStats,
    highRelevanceCases,
  };
};
