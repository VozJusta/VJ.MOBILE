import { IPagination } from "@/interfaces/shared/pagination";
import { Role } from "@/types/roles/roles";

export interface IReport {
  id: string;
  category_detected: string;
  status: "Pending" | "Accepted" | "Refused";
  created_at: string;
}

export interface IGetReportsResponse {
  role: Role;
  user: {
    data: IReport[];
  };
  pagination: IPagination;
}
