import { IPagination } from "@/interfaces/shared/pagination";

export interface ILawyersList {
  data: {
    id: string;
    full_name: string;
    specialization: string;
    avatar_image: string;
    rating: number;
  }[];
  pagination: IPagination;
}
