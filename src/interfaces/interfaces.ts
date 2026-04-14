import { MaterialIcons } from "@expo/vector-icons";






export interface ICaseSelectProps {
  title: string;
}

export interface IButtonProfile {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  namebutton: string;
  path: string;
  NextButton: boolean;
}

export type Role = "citizen" | "lawyer";
export interface IRoleStore {
  role: Role | null;
  setRole: (role: Role) => void;
  clearRole: () => void;
}

export interface IButtonRequest {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  title: string;
  path: string;
  description: string;
}
