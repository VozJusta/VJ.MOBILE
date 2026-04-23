import { TCaseStatus } from "@/interfaces/components/CaseCard";

export interface LawyerRequest {
  id: string;
  clientName: string;
  category_detected: string;
  statusCase: TCaseStatus;
  created_at: string;
}
