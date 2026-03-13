import { ReactNode } from "react";
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
  shadow?: string;
  border?: string;
  iconLeft: boolean;
  colorsStatus?: "orange" | "green" | "blue";
  paddingButtonStatus: string;
  status?: "Em Análise" | "Concluído" | "Aguardando Advogado" | null;
  statusBorder?: boolean;
}
