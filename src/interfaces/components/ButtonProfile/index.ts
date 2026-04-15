import { MaterialIcons } from "@expo/vector-icons";

export interface IButtonProfile {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  namebutton: string;
  path: string;
  NextButton: boolean;
}
