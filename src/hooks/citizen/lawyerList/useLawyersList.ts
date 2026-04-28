import { usePagination } from "@/hooks/shared/pagination";
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

  const { page, pageSize, setPaginationMeta, ...pagination } =
    usePagination(initialPageSize);

  const fetchLawyers = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await getLawyersList(pageNumber, pageSize);

      if (response.success && response.data) {
        setLawyers(response.data.data);
        setPaginationMeta(response.data.pagination);
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
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao enviar solicitação",
          text2: response.fields?.[0],
        });
        return false;
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar solicitação",
        text2: "Tente novamente mais tarde",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers(1);
  }, [page, pageSize]);

  const refresh = () => {
    fetchLawyers(page);
  };

  return {
    lawyers,
    loading,
    page,
    refresh,
    fetchLawyerById,
    lawyerSelected,
    sendRequestToLawyer,
    ...pagination,
  };
}
