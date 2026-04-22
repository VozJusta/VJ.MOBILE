import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { specializationOptions } from "@/utils/auth/users/Lawyer/data";

export const translateStatus = (status: TCaseStatus) => {
  switch (status) {
    case "accepted":
      return "Aceito";
    case "pending":
      return "Em Análise";
    case "refused":
      return "Recusado";
    default:
      return status;
  }
};

export const getCategoryLabel = (value: string) => {
  const option = specializationOptions.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const getStatusIcon = (status: TCaseStatus) => {
  switch (status) {
    case "accepted":
      return "verified";
    case "pending":
      return "article";
    case "refused":
      return "cancel";
    default:
      return "article";
  }
};
