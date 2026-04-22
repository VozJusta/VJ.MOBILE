export interface IToken {
  email: string;
  fullName: string;
}

export interface ICitizenRegisterResponse {
  fullName: string;
  cpf: string;
  cnpj: string;
  phone: string;
  email: string;
  password: string;
  billingType: "Monthly" | "Yearly" | "OneTime";
  namePlan: string;
}
