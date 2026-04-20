import { specializationOptions } from "@/utils/auth/users/Lawyer/data";

export const translateStatus = (status: string) => {
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
