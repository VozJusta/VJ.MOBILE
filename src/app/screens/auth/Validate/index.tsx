import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";

type ValidationSource = "citizen" | "lawyer";

export default function ValidateEmail() {
  const router = useRouter();
  const { source, email, registerCompleted } = useLocalSearchParams<{
    source?: ValidationSource | ValidationSource[];
    email?: string | string[];
    registerCompleted?: string;
  }>();

  const registerCompletedValue = Array.isArray(registerCompleted)
    ? registerCompleted[0]
    : registerCompleted;

  const sourceValue = Array.isArray(source) ? source[0] : source;
  const emailValue = Array.isArray(email) ? email[0] : email;
  const resolvedSource: ValidationSource =
    sourceValue?.toLowerCase() === "lawyer" ? "lawyer" : "citizen";

  return (
    <ForgotPasswordTemplate
      email={emailValue ? emailValue : ""}
      screen={ScreensForgotPassword.Code}
      codeDescription={
        emailValue
          ? `Enviamos um código de 6 dígitos para ${emailValue}`
          : "Enviamos um código de 6 dígitos para seu email"
      }
      onCodeVerified={() => {
        console.log("registerCompleted:", registerCompletedValue);
        console.log("resolvedSource:", resolvedSource);
        console.log("emailValue:", emailValue);
        console.log(
          "rota:",
          `/screens/auth/completeRegister/${resolvedSource}?source=${resolvedSource}&email=${encodeURIComponent(emailValue || "")}`,
        );
        console.log("registerCompleted:", registerCompletedValue);
        if (registerCompletedValue === "true") {
          router.push(
            resolvedSource === "lawyer"
              ? "/screens/lawyer/home"
              : "/screens/citizen/home",
          );
          return;
        }

        console.log("registerCompleted:", registerCompletedValue);
        if (registerCompletedValue === "false") {
          router.push(
            `/screens/auth/completeRegister/${resolvedSource}?source=${resolvedSource}&email=${encodeURIComponent(emailValue || "")}`,
          );
          return;
        }

        console.log("registerCompleted:", registerCompletedValue);
        router.push(
          resolvedSource === "lawyer"
            ? "/screens/lawyer/home"
            : "/screens/citizen/home",
        );
      }}
    />
  );
}
