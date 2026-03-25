import { MaterialIcons } from "@expo/vector-icons";

export interface IButtonCases {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  color: "orange" | "green" | "blue";
  title: string;
  path: string;
  status:"Em Análise" | "Concluído" | "Aguardando Advogado"; 
}