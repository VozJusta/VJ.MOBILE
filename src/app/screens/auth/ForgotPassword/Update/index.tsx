import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
import React, { useEffect, useRef, useState } from "react";
import passwordValidate from "@/utils/passwordValidate";
import Toast from "react-native-toast-message";
import { useEmailStorage } from "@/store/email.store";
import { useAuth } from "@/hooks/useAuth";
import { UpdatePasswordService } from "@/services/auth/forgotPassword/updatePassword";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export default function UpdatePassword() {
  const email = useEmailStorage((state) => state.email);
  const { loading, setLoading } = useAuth()
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMismatch =
    newPassword !== confirmPassword && confirmPassword.length > 0;
  const wasMismatchRef = useRef(false);
  const clearEmail = useEmailStorage((state) => state.clearEmail);

  useEffect(() => {
    if (isMismatch && !wasMismatchRef.current) {
      Toast.show({ type: "error", text1: "As senhas não coincidem" });
    }

    wasMismatchRef.current = isMismatch;
  }, [isMismatch]);

  const response = newPassword === confirmPassword ? newPassword : "";
  const strength = passwordValidate(response);
  const router = useRouter();

  const handleUpdatePassword = async (email: string, confirmPassword: string, newPassword: string) => {
    setLoading(true);
    Alert.alert("Iniciando envio de código", `Email: ${email}`);
    const response = await UpdatePasswordService({
      confirmPassword: confirmPassword,
      password: newPassword,
      email: email
    });
    console.log("Resposta do CodeSeding:", response);

    if (!response.success) {
      Toast.show({
        type: "error",
        text1:  response.fields && response.fields[0],
      });
      setLoading(false);
      return;
    }

    console.log("Senha atualizada com sucesso:", response.data);
    Toast.show({
      type: "success",
      text1: response.data || "Senha atualizada com sucesso!",
    });
    router.replace("/screens/auth/users/SingIn");
    clearEmail();
    return;
  };

  return (
    <ForgotPasswordTemplate
      email=""
      confirmPassword={confirmPassword}
      newPassword={newPassword}
      setConfirmPassword={setConfirmPassword}
      setNewPassword={setNewPassword}
      screen={ScreensForgotPassword.Update}
      onSubmit={() => handleUpdatePassword(email, confirmPassword, newPassword)}
      labelButton={loading ? "Atualizando..." : "Redefinir senha"}
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
