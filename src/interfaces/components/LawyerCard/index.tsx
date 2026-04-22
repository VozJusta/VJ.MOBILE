import { IBadge } from "../Badge";

export interface ILawyerCard {
  name: string;
  badges: IBadge[];
  rating?: number;
  onPress?: () => void;
}