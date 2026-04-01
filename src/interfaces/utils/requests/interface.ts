import { MaterialIcons } from "@expo/vector-icons";

export interface IButtonRequest {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  title: string;
  path: string;
  description: string;

}