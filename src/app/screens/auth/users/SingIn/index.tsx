import { useState } from "react";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { getInitialSignInData } from "@/utils/auth/users/SingIn/data";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { loginAuth, handleLoginChange } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const signInData = getInitialSignInData(
    loginAuth,
    handleLoginChange,
    showPassword,
    () => setShowPassword((prev) => !prev),
  );

  return <SignInTemplate {...signInData} />;
}