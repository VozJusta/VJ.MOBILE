import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";

type ValidationSource = "citizen" | "lawyer";

export default function ValidateEmail() {
  const router = useRouter();
  const { source, email } = useLocalSearchParams<{
    source?: ValidationSource | ValidationSource[];
    email?: string | string[];
  }>();

  const sourceValue = Array.isArray(source) ? source[0] : source;
  const emailValue = Array.isArray(email) ? email[0] : email;
  const resolvedSource: ValidationSource =
    sourceValue === "lawyer" ? "lawyer" : "citizen";
  const codeBackRoute =
    resolvedSource === "lawyer"
      ? "/screens/auth/users/SingUp/Lawyer"
      : "/screens/auth/users/SingUp/Citizen";

  return (
    <ForgotPasswordTemplate
      email={emailValue ? emailValue : ""}
      screen={ScreensForgotPassword.Code}
      codeDescription={
        emailValue
          ? `Enviamos um código de 6 dígitos para ${emailValue}`
          : "Enviamos um código de 6 dígitos para seu email"
      }
      onCodeVerified={() => router.replace(resolvedSource === "lawyer" ? "/screens/lawyer/home" : "/screens/citizen/home")}
    />
  );
}
