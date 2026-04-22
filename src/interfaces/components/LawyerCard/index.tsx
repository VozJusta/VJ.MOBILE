import { IBadge } from "../Badge";

export interface LawyerCardProps {
  name: string;
  badges: IBadge[];
  rating?: number;
  onPress?: () => void;
}