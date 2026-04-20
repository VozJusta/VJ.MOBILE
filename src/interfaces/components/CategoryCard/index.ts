import { MaterialIcons } from "@expo/vector-icons";

export interface ICategoryCard {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  title: string;
  path: string;
  description: string;
  isSelected?: boolean;
  onPress?: () => void;
}
