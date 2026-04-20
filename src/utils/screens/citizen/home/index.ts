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
