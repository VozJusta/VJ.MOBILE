import { TCaseStatus } from "@/interfaces/components/CaseCard";

export interface ISendRequest {
  message: string;
  caseRequest: {
    id: string;
    case_id: string;
    citizen_id: string;
    lawyer_id: string;
    status: TCaseStatus;
    created_at: string;
    updated_at: string;
  };
}
