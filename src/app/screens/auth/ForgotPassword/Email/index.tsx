import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";

export default function ForgotPasswordEmail() {
  return (
    <ForgotPasswordTemplate email="" screen={ScreensForgotPassword.Email} />
  );
}
