import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export interface INavbar {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    name: string;
    path: string;
}