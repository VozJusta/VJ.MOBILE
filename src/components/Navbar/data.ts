import { INavbar } from "@/interfaces/components/Navbar";

export const NavbarItemsLawyer: INavbar[] = [
  {
    iconName: "home",
    name: "Início",
    path: "/screens/lawyer/home",
  },
  {
    iconName: "cases",
    name: "Solicitações",
    path: "/screens/lawyer/requests",
  },
  {
    iconName: "person",
    name: "Perfil",
<<<<<<< HEAD
    path: "/screens/shared/profile",
  },
];
=======
    path: "/screens/lawyer/profile",
  },
]
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308

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
<<<<<<< HEAD
    path: "/screens/shared/profile",
=======
    path: "/screens/citizen/profile",
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
  },
];
