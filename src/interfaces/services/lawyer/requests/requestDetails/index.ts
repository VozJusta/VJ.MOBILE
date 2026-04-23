import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { Role } from "@/types/roles/roles";

export interface IRequestDetails {
  role: Role;
  user: {
    report: {
      id: string;
      title: string;
      transcription: string;
      simplified_explanation: string;
      legal_analysis: string;
      category_detected: string;
      status: TCaseStatus;
      evidence: string[];
      citizen: IRequestCitizenDetails;
    };
  };
}

export interface IRequestCitizenDetails {
  full_name: string;
  phone: string;
  email: string;
}
