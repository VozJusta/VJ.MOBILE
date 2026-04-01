import { MaterialIcons } from "@expo/vector-icons";

export interface IButtonCases {
  id: number
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  color: "orange" | "green" | "blue";
  title: string;
  status:"Em Análise" | "Concluído" | "Aguardando Advogado"; 
}