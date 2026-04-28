import { IPagination } from "@/interfaces/shared/pagination";

export interface IPaginationComponent extends Omit<IPagination, "totalItems" | "pageSize"> {
  loading?: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (pageNumber: number) => void;
}
