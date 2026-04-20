import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
import { router } from "expo-router";
export default function VerifyEmail() {
  return (
    <ForgotPasswordTemplate email="" screen={ScreensForgotPassword.Code} onCodeVerified={() => router.push("/screens/auth/ForgotPassword/Update")} />
  );
}
