import { IButtonProfile } from "@/interfaces/interfaces";

export const ButtonsProfile: IButtonProfile[] = [
    {
        bgIcon: "rgba(59,130,246,0.1)",
        colorIcon: "#3C77E8",
        icon: "account-circle",
        namebutton: "Meus Dados",
        path: "/screens/shared/profile/myData",
        NextButton:true
    },
    {
        bgIcon: "rgba(168,85,247,0.1)",
        colorIcon: "#CB30E0",
        icon: "settings",
        namebutton: "Configurações",
        path: "/screens/shared/profile/settings",
        NextButton:true
    },
    {
        bgIcon: "rgba(16,185,129,0.1)",
        colorIcon: "#75FB4C",
        icon: "verified-user",
        namebutton: "Privacidade",
        path: "/screens/shared/profile/privacity",
        NextButton:true
    },
    {
        bgIcon: "rgba(245,158,11,0.1)",
        colorIcon: "#FFFF55",
        icon: "help",
        namebutton: "Central de Ajuda",
        path: "/screens/shared/profile/help",
        NextButton:true
    },
    {
        bgIcon: "rgba(239,68,68,0.1)",
        colorIcon: "#EA3323",
        icon: "logout",
        namebutton: "Sair da Conta",
        path: "/screens/auth/users/SingIn",
        NextButton:false
    },
]
