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
  const roleLower = role.toLowerCase();


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
