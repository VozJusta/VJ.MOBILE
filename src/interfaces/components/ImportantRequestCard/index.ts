import { IBadge } from "../Badge";

export type IImportantRequestCardProps = IBadge & {
  title: string;
  confidence_score: number;
};