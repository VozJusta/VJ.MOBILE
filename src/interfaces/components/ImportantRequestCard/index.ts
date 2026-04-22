import { BadgeProps } from "../Badge";

export type ImportantRequestCardProps = BadgeProps & {
  title: string;
  confidence_score: number;
};