import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { ILawyerRequest } from "@/interfaces/services/lawyer/requests";
import { IRequestDetails } from "@/interfaces/services/lawyer/requests/requestDetails";
import { getLawyerRequests } from "@/services/lawyer/requests";
import { getRequestDetailsById } from "@/services/lawyer/requests/requestDetails";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useLawyerRequests = () => {
  const [requests, setRequests] = useState<ILawyerRequest[]>([]);
  const [requestDetails, setRequestDetails] = useState<IRequestDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

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

  const fetchRequestById = async (requestId: string) => {
    setLoading(true);

    try {
      const response = await getRequestDetailsById(requestId);

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

  return {
    requests,
    loading,
    fetchRequests,
    fetchRequestById,
    requestDetails,
  };
};
