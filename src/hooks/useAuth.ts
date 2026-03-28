import { useState } from "react";

export const useAuth = () => {
  const [loginAuth, setLoginAuth] = useState<ZodLoginTypes>({
    email: "",
    password: "",
  });

  const [registerAuth, setRegisterAuth] = useState<ZodRegisterTypes>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    cnpj: "",
  });



  const [loading, setLoading] = useState(false);

  function handleLoginChange(name: keyof ZodLoginTypes, value: string) {
    setLoginAuth((prev) => ({ ...prev, [name]: value }));
  }
  function handleRegisterChange(name: keyof ZodRegisterTypes, value: string) {
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
