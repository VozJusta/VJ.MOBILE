import { useState } from "react";
import { router } from "expo-router";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { getInitialCitizenData } from "@/utils/auth/users/SingUp/Citizen/data";
import passwordValidate from "@/utils/passwordValidate";
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";


export default function Citizen() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerAuth } = useAuth();
  const strength = passwordValidate(registerAuth.password);
  const citizenData = getInitialCitizenData(
    showPassword,
     () => setShowPassword((prev) => !prev),
  );
    

  return (
    <SignInTemplate
      {...citizenData}
      onSubmit={() =>
        router.push(
          `/screens/auth/Validate?source=citizen&email=${encodeURIComponent(registerAuth.email)}`,
        )
      }
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
