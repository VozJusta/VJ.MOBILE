import { MaterialIcons } from "@expo/vector-icons";

export type CaseStatus = "Em Análise" | "Concluído" | "Aguardando Advogado";

export interface CaseCardProps {
  title: string;
  status: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}