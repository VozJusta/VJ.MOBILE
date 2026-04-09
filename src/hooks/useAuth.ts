import { ZodLoginTypes, ZodSingUpTypes, ZodUpdatePasswordTypes } from "@/interfaces/validation/zodTypes";
import { useState } from "react";

export const useAuth = () => {
  const [loginAuth, setLoginAuth] = useState<ZodLoginTypes>({
    email: "",
    password: "",
  });

  const [registerAuth, setRegisterAuth] = useState<ZodSingUpTypes>({
    email: "",
    password: "",
    cpf:"",
    fullName: "",
    phone: "",
  });

  const [password,setPassword] = useState<ZodUpdatePasswordTypes>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleLoginChange(name: keyof ZodLoginTypes, value: string) {
    setLoginAuth((prev) => ({ ...prev, [name]: value }));
  }
  function handleRegisterChange(name: keyof ZodSingUpTypes, value: string) {
    setRegisterAuth((prev) => ({ ...prev, [name]: value }));
  }

  return {
    loginAuth,
    registerAuth,
    handleLoginChange,
    handleRegisterChange,
    loading,
    setLoading,
  };
};
