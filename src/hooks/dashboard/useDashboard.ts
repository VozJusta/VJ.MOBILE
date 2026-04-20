import { IReport } from "@/interfaces/services/dashboard/reports/cards";
import { reportByCitizen } from "@/services/dashboard/reports/reportByCitizen";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useDashboard(initialPageSize: number = 3) {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const pageSize = initialPageSize;

  const fetchReports = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await reportByCitizen(pageNumber, pageSize);

      if (response.success && response.data) {
        setReports(response.data.user.data);
        setPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.totalPages);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPreviousPage(response.data.pagination.hasPreviousPage);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar relatórios",
          text2: response.fields?.[0],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar relatórios",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(page);
  }, [page, pageSize]);

  const goToNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return {
    reports,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  }
}
