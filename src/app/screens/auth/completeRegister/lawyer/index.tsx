import { useAuth } from "@/hooks/auth/useAuth";
import { BASE_URL } from "@/settings/BASE_URL";
import { useXTokenStorage } from "@/store/auth/token.store";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { Role } from "@/types/roles/roles";
import { useBuildCompleteRegisterFields } from "@/utils/auth/users/CompleteResgister";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function CompleteRegisterCitizen() {
  const { completeRegisterAuth, handleCompleteRegisterChange } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const params = useLocalSearchParams();

  const email = params["email"] as string;
  const role = params["source"] as Role;
  const xToken = useXTokenStorage.getState().token;
  const roleLower = role.toLowerCase();
  console.log("xToken:", xToken);
  console.log("BASE_URL:", BASE_URL);
  console.log("Role recebido:", roleLower);
  console.log("URL completa:", `${BASE_URL}/auth/complete/${roleLower}`);

  const completeRegisterData = useBuildCompleteRegisterFields({
    registerAuth: completeRegisterAuth,
    handleRegisterChange: handleCompleteRegisterChange,
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
    role: roleLower as Role,
    email,
  });
  return (
    <SignInTemplate
      title="Complete seu cadastro"
      description="Preencha os dados para continuar"
      fields={completeRegisterData.fields}
      onSubmit={completeRegisterData.onSubmit}
      submitLabel={completeRegisterData.titleButton}
      disableSubmit={completeRegisterData.disableSubmit}
    />
  );
}
