import { MaterialIcons } from "@expo/vector-icons";


export interface CaseCardProps {
  title: string;
  status: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}