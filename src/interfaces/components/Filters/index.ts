import { TCaseStatus } from "../CaseCard";

export interface IAmounts {
    total: number;
    Accepted: number;
    Pending: number;
    Refused: number;
}

export interface IFiltersProps {
  statusSelected?: TCaseStatus;
  onFilterChange: (filter: TCaseStatus) => void;
  amounts: IAmounts;
}