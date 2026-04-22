import { Role } from "@/types/roles/roles";
import { PlanType } from "../me";

export interface IToken {
  email: string;
  fullName: string;
}

export interface ICitizenRegisterResponse {
  validated: boolean;
  sub: string;
  role: Role;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
  subscription: {
    plan: {
      type: PlanType;
      billing_type: "Monthly" | "Yearly" | "OneTime";
      name: string;
    };
  };
}
