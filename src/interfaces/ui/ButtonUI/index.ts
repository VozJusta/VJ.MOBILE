import { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
export interface IButtonProps {
  children?: ReactNode;
  goNext?: boolean;
  goBack?: boolean;
  bg?: string;
  active?: boolean;
  onPress: () => void;
  gradient: boolean;
  size?: string;
  hover: boolean;
  border?: string;
  iconLeft: boolean;
  colorsStatus?: "orange" | "green" | "blue";
  paddingButtonStatus: string;
  status?: "Em Análise" | "Concluído" | "Aguardando Advogado";
  statusBorder?: boolean;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
}
