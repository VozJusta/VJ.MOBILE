import { BadgeProps } from "../Badge";

export interface LawyerCardProps {
  name: string;
  badges: BadgeProps[];
  rating?: number;
}