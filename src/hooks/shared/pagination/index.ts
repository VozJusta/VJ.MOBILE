import { IPagination } from "@/interfaces/shared/pagination";
import { useState } from "react";

export function usePagination(initialPageSize: number = 6) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const pageSize = initialPageSize;

  const setPaginationMeta = (paginationData: IPagination) => {
    setPage(paginationData.page);
    setTotalPages(paginationData.totalPages);
    setHasNextPage(paginationData.hasNextPage);
    setHasPreviousPage(paginationData.hasPreviousPage);
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber !== page) {
      setPage(pageNumber);
    }
  };
  return {
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    pageSize,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setPaginationMeta,
  };
}
