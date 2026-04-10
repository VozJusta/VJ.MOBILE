import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
import { usePathname } from "expo-router";

export default function ForgotPasswordEmail() {
  const pathName = usePathname();

  return <ForgotPasswordTemplate email="" screen={ScreensForgotPassword.Email} />;
}
