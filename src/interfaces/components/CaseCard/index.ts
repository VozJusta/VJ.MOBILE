import { MaterialIcons } from "@expo/vector-icons";

export type TCaseStatus = "pending" | "accepted" | "refused";

export interface ICaseCard {
  title: string;
  status: TCaseStatus;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}