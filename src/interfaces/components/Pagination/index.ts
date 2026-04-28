import { IPagination } from "@/interfaces/shared/pagination";

export interface IPaginationComponent extends IPagination {
  loading?: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (pageNumber: number) => void;
  pageNumbers: number[];
}
