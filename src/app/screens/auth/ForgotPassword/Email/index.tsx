import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ForgotPasswordTemplate } from "@/template/auth/ForgotPasswordTemplate";
<<<<<<< HEAD
import { usePathname } from "expo-router";

export default function ForgotPasswordEmail() {
  const pathName = usePathname();

  return <ForgotPasswordTemplate email="" screen={ScreensForgotPassword.Email} />;
=======

export default function ForgotPasswordEmail() {
  return <ForgotPasswordTemplate screen={ScreensForgotPassword.Email} />;
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
}
