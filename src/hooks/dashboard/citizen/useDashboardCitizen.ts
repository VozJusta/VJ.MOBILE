import { usePagination } from "@/hooks/shared/pagination";
import { IReport } from "@/interfaces/services/dashboard/citizen/reports/cards";
import { getReportDetails } from "@/services/dashboard/citizen/reports/detailsReport";
import { reportByCitizen } from "@/services/dashboard/citizen/reports/reportByCitizen";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useDashboardCitizen(initialPageSize: number = 3) {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState(false);
  const { setPaginationMeta, pageSize, page, ...pagination } = usePagination(initialPageSize);

  const fetchReports = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await reportByCitizen(pageNumber, pageSize);

      if (response.success && response.data) {
        setReports(response.data.user.data);
        setPaginationMeta(response.data.pagination);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar relatórios",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar relatórios",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDetailsReportById = async (reportId: string) => {
    try {
      const response = await getReportDetails(reportId);

      response;

      if (response.success && response.data) {
        return response.data;
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar detalhes do relatório",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar detalhes do relatório",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  useEffect(() => {
    fetchReports(page);
  }, [page, pageSize]);

  return {
    reports,
    loading,
    getDetailsReportById,
    ...pagination,
    page
  };
}
