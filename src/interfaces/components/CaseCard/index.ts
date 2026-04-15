import { MaterialIcons } from "@expo/vector-icons";

export type CaseStatus = "Em Análise" | "Concluído" | "Aguardando Advogado";

export interface CaseCardProps {
  title: string;
  status: CaseStatus;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}