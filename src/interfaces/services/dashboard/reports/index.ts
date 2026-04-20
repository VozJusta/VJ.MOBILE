export interface IReport {
  id: string;
  category_detected: string;
  status: "Pending" | "Accepted" | "Refused";
  created_at: string;
}


