import { TCaseStatus } from "../CaseCard";

export interface IFiltersProps {
  statusSelected?: TCaseStatus;
  onFilterChange: (filter: TCaseStatus) => void;
}