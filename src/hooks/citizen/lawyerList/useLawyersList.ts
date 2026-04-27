import { ILawyerSelected } from "@/interfaces/services/citizen/lawyerSelected";
import { ILawyersList } from "@/interfaces/services/citizen/lawyersList";
import { getLawyerSelected } from "@/services/citizens/lawyerSelected";
import { getLawyersList } from "@/services/citizens/lawyersList";
import { sendRequest } from "@/services/citizens/sendRequest";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useLawyersList(initialPageSize: number = 6) {
  const [lawyers, setLawyers] = useState<ILawyersList["data"]>([]);
  const [lawyerSelected, setLawyerSelected] = useState<ILawyerSelected | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const pageSize = initialPageSize;

  const fetchLawyers = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await getLawyersList(pageNumber, pageSize);

      if (response.success && response.data) {
        setLawyers(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPreviousPage(response.data.pagination.hasPreviousPage);
        setPage(response.data.pagination.page);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar advogados",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar advogados",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLawyerById = async (lawyerId: string) => {
    setLoading(true);

    try {
      const response = await getLawyerSelected(lawyerId);

      if (response.success && response.data) {
        setLawyerSelected(response.data);
        return response.data;
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar advogado",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar advogado",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendRequestToLawyer = async (caseId: string, lawyerId: string) => {
    setLoading(true);

    try {
      const response = await sendRequest(caseId, lawyerId);

      if (response.success && response.data) {
        Toast.show({
          type: "success",
          text1: "Solicitação enviada",
          text2: "Sua solicitação foi enviada com sucesso",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao enviar solicitação",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar solicitação",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers(1);
  }, [pageSize]);

  const goToNextPage = () => {
    if (hasNextPage) {
      fetchLawyers(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      fetchLawyers(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchLawyers(pageNumber);
    }
  };

  const refresh = () => {
    fetchLawyers(page);
  };

  return {
    lawyers,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    refresh,
    fetchLawyerById,
    lawyerSelected,
    sendRequestToLawyer
  };
}
