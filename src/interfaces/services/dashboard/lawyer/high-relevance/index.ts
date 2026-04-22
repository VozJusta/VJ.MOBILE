import { CaseStatus } from "@/interfaces/components/CaseCard";

export interface IHighRelevanceResponse {
  id: string;
  title: string;
  confidence_score: number;
  category_detected: string;
  status: CaseStatus;
}
