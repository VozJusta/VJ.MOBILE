import { INavbar } from "@/interfaces/components/Navbar";

export const NavbarItemsLawyer: INavbar[] = [
  {
    iconName: "home",
    name: "Início",
    path: "/screens/lawyer/home",
  },
  {
    iconName: "cases",
    name: "Meus casos",
    path: "/screens/lawyer/cases",
  },
  {
    iconName: "person",
    name: "Perfil",
    path: "/screens/lawyer/profile",
  },
]

export const NavbarItemsCitizen: INavbar[] = [
  {
    iconName: "home",
    name: "Início",
    path: "/screens/citizen/home",
  },
  {
    iconName: "folder",
    name: "Documentos",
    path: "/screens/citizen/documents",
  },
  {
    iconName: "chat-bubble",
    name: "Chat",
    path: "/screens/citizen/chat",
  },
  {
    iconName: "person",
    name: "Perfil",
    path: "/screens/citizen/profile",
  },
];
