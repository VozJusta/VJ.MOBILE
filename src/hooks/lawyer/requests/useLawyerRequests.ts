import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { ILawyerRequest } from "@/interfaces/services/lawyer/requests";
import { getLawyerRequests } from "@/services/lawyer/requests";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useLawyerRequests = () => {
  const [requests, setRequests] = useState<ILawyerRequest[]>([]);
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
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar solicitações",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    requests,
    loading,
  };
};
