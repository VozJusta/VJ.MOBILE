import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";

export default function ForgotPasswordEmail() {
  return <ForgotPasswordTemplate screen={ScreensForgotPassword.Email} />;
}
