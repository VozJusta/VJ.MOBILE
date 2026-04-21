export enum PlanType {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  MEDIUM = "MEDIUM",
}

export interface IMeResponse {
  id: string;
  full_name: string;
  session_id: string;
  subscription: {
    plan: {
        type: PlanType;
    }
  };
}

