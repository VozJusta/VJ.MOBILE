import { BadgeProps } from "../Badge";

export type ImportantRequestCardProps = BadgeProps & {
  title: string;
  score: number;
};