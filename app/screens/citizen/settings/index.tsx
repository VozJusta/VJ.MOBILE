import {
  ISettingsSection,
} from "@/interfaces/template/settingsTemplate";
import { router } from "expo-router";
import SettingsTemplate from "@/template/settingsTemplate";
import { useMemo, useState } from "react";

export default function MainSettings() {
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const sections = useMemo<ISettingsSection[]>(() => [
      {
        id: "app-preferences",
        title: "Preferências do app",
        items: [
          {
            id: "push-notifications",
            type: "switch",
            icon: "notifications-none",
            label: "Notificações Push",
            value: isPushEnabled,
            onValueChange: setIsPushEnabled,
          },
          {
            id: "dark-mode",
            type: "switch",
            icon: "dark-mode",
            label: "Modo Escuro",
            value: isDarkModeEnabled,
            onValueChange: setIsDarkModeEnabled,
          },
          {
            id: "language",
            type: "link",
            icon: "language",
            label: "Idioma",
            rightLabel: "Português (BR)",
            onPress: () => {},
          },
        ],
      },
      {
        id: "security",
        title: "Segurança",
        items: [
          {
            id: "2fa",
            type: "switch",
            icon: "verified-user",
            label: "Autenticação 2FA",
            value: is2FAEnabled,
            onValueChange: setIs2FAEnabled,
          },
          {
            id: "change-password",
            type: "link",
            icon: "lock-reset",
            label: "Alterar Senha",
            onPress: () => {
              router.push("/screens/auth/ForgotPassword/Email");
            },
          },
        ],
      },
      {
        id: "information",
        title: "Informações",
        items: [
          {
            id: "terms",
            type: "link",
            icon: "description",
            label: "Termos de Uso",
            onPress: () => {},
          },
          {
            id: "privacy",
            type: "link",
            icon: "policy",
            label: "Privacidade",
            onPress: () => {},
          },
        ],
      },
    ],
    [isPushEnabled, isDarkModeEnabled, is2FAEnabled],
  );

  return (
    <SettingsTemplate
      title="Configurações"
      onBack={() => router.back()}
      sections={sections}
      versionLabel="Versão 2.4.0 (Build 88)"
      supportCard={{
        title: "Falar com suporte",
        description: "Atendimento 24/7 disponível",
        onPress: () => {},
      }}
    />
  );
}
