import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { ILawyerRequest } from "@/interfaces/services/lawyer/requests";
import { IRequestDetails } from "@/interfaces/services/lawyer/requests/requestDetails";
import { getLawyerRequests } from "@/services/lawyer/requests";
import { patchRequest } from "@/services/lawyer/requests/requestActions";
import { getRequestDetailsById } from "@/services/lawyer/requests/requestDetails";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useLawyerRequests = () => {
  const [requests, setRequests] = useState<ILawyerRequest[]>([]);
  const [requestDetails, setRequestDetails] = useState<IRequestDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRequests = async (status?: TCaseStatus) => {
    setLoading(true);

    try {
      const response = await getLawyerRequests(status);

      if (response.success && response.data) {
        setRequests(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar solicitações",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar solicitações",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestById = async (caseId: string) => {
    setLoading(true);

    try {
      const response = await getRequestDetailsById(caseId);

      if (response.success && response.data) {
        setRequestDetails(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao buscar detalhes da solicitação",
          text2: response.fields?.[0],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar detalhes da solicitação",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (
    requestId: string,
    action: "accept" | "reject",
  ) => {
    setActionLoading(`${requestId}-${action}`);
    try {
      const response = await patchRequest(requestId, action);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: `Solicitação ${action === "accept" ? "aceita" : "rejeitada"} com sucesso!`,
        });
        fetchRequestById(requestId);
      } else {
        Toast.show({
          type: "error",
          text1: `Erro ao ${action === "accept" ? "aceitar" : "rejeitar"} solicitação`,
          text2: response.message,
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: `Erro ao ${action === "accept" ? "aceitar" : "rejeitar"} solicitação`,
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setActionLoading(null);
    }
  };

  return {
    requests,
    loading,
    fetchRequests,
    fetchRequestById,
    requestDetails,
    handleRequestAction,
    actionLoading,
  };
};
