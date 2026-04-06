import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
import { usePathname } from "expo-router";

export default function VerifyEmail() {
  const pathName = usePathname();
  console.log("PATHNAME:", pathName);
  return (
    <ForgotPasswordTemplate
      email=""
      screen={ScreensForgotPassword.Code}
    />
  );
}
