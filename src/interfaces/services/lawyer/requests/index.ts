import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { IPagination } from "@/interfaces/shared/pagination";

export interface ILawyerRequest {
  data: IRequestDetailsCard[];
  pagination: IPagination;
}

export interface IRequestDetailsCard {
  id: string;
  clientName: string;
  category_detected: string;
  statusCase: TCaseStatus;
  created_at: string;
  reportId?: string;
  caseId: string;
}
