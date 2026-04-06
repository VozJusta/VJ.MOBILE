import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
import React, { useEffect, useRef, useState } from "react";
import passwordValidate from "@/utils/passwordValidate";
import Toast from "react-native-toast-message";
import { usePathname } from "expo-router";

export default function UpdatePassword() {
  const pathName = usePathname();
  console.log("PATHNAME:", pathName);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMismatch =
    newPassword !== confirmPassword && confirmPassword.length > 0;
  const wasMismatchRef = useRef(false);

  useEffect(() => {
    if (isMismatch && !wasMismatchRef.current) {
      Toast.show({ type: "error", text1: "As senhas não coincidem" });
    }

    wasMismatchRef.current = isMismatch;
  }, [isMismatch]);

  const response = newPassword === confirmPassword ? newPassword : "";
  const strength = passwordValidate(response);
  return (
    <ForgotPasswordTemplate
      email=""
      confirmPassword={confirmPassword}
      newPassword={newPassword}
      setConfirmPassword={setConfirmPassword}
      setNewPassword={setNewPassword}
      screen={ScreensForgotPassword.Update}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: [
          {
            label: "8+ Caracteres",
            valid: newPassword.length >= 8,
          },
          {
            label: "Símbolo",
            valid: /[@$!%*?&]/.test(newPassword),
          },
          {
            label: "Maiúscula",
            valid: /[A-Z]/.test(newPassword),
          },
          {
            label: "Número",
            valid: /[0-9]/.test(newPassword),
          },
        ],
      }}
    />
  );
}
