import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";

export default function VerifyEmail() {
  return <ForgotPasswordTemplate screen={ScreensForgotPassword.Code} />;
}
