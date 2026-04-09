import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
<<<<<<< HEAD
import { usePathname } from "expo-router";

export default function VerifyEmail() {

  return (
    <ForgotPasswordTemplate
      email=""
      screen={ScreensForgotPassword.Code}
    />
  );
=======

export default function VerifyEmail() {
  return <ForgotPasswordTemplate screen={ScreensForgotPassword.Code} />;
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
}
