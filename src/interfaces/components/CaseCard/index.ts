import { MaterialIcons } from "@expo/vector-icons";

export type TCaseStatus = "Pending" | "Accepted" | "Refused";

export interface ICaseCard {
  title: string;
  status: TCaseStatus;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}