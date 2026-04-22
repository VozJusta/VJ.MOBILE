import { IBadge } from "../Badge";

export type ImportantRequestCardProps = IBadge & {
  title: string;
  confidence_score: number;
};