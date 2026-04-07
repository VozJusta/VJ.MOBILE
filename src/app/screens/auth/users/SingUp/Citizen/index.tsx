import { useMemo, useState } from "react";
import { router } from "expo-router";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { getInitialCitizenData } from "@/utils/auth/users/SingUp/Citizen/data";
import passwordValidate from "@/utils/passwordValidate";
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";

export default function Citizen() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerAuth, handleRegisterChange } = useAuth();
  const strength = useMemo(() => {
    return passwordValidate(registerAuth.password);
  },[registerAuth.password]);
  console.log("senha: ", strength);
  const citizenData = getInitialCitizenData(
    showPassword,
    () => setShowPassword((prev) => !prev),
    registerAuth,
    handleRegisterChange,
  );

  return (
    <SignInTemplate
      {...citizenData}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: [
          {
            label: "8+ Caracteres",
            valid: registerAuth.password.length >= 8,
          },
          {
            label: "Símbolo",
            valid: /[@$!%*?&]/.test(registerAuth.password),
          },
          {
            label: "Maiúscula",
            valid: /[A-Z]/.test(registerAuth.password),
          },
          {
            label: "Número",
            valid: /[0-9]/.test(registerAuth.password),
          },
        ],
      }}
    />
  );
}
