import { MaterialIcons } from "@expo/vector-icons";

export interface IEmptyState {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  description?: string;
}