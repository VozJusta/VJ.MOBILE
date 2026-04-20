import { MaterialIcons } from "@expo/vector-icons";

export type CaseStatus = "Pending" | "Accepted" | "Refused";

export interface CaseCardProps {
  title: string;
  status: CaseStatus;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}