import { CaseStatus } from "@/interfaces/components/CaseCard";
import { specializationOptions } from "@/utils/auth/users/Lawyer/data";

export const translateStatus = (status: CaseStatus) => {
  switch (status) {
    case "Accepted":
      return "Aceito";
    case "Pending":
      return "Em Análise";
    case "Refused":
      return "Recusado";
    default:
      return status;
  }
};

export const getCategoryLabel = (value: string) => {
  const option = specializationOptions.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const getStatusIcon = (status: CaseStatus) => {
  switch (status) {
    case "Accepted":
      return "verified";
    case "Pending":
      return "article";
    case "Refused":
      return "cancel";
    default:
      return "article";
  }
};
