import {
  ZodLoginTypes,
  ZodSignUpLawyerTypes,
  ZodSignUpTypes,
  ZodUpdatePasswordTypes,
} from "@/interfaces/validation/zodTypes";
import { useState } from "react";

export const useAuth = () => {
  const [loginAuth, setLoginAuth] = useState<ZodLoginTypes>({
    email: "",
    password: "",
  });

  const [registerAuth, setRegisterAuth] = useState<ZodSignUpTypes>({
    email: "",
    password: "",
    cpf: "",
    fullName: "",
    phone: "",
  });

  const [registerAuthLawyer, setRegisterAuthLawyer] = useState<ZodSignUpLawyerTypes>({
    email: "",
    password: "",
    cpf: "",
    fullName: "",
    phone: "",
    oabNumber: "",
    oabState: "",
    specialization: "",
  });

  const [password, setPassword] = useState<ZodUpdatePasswordTypes>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleLoginChange(name: keyof ZodLoginTypes, value: string) {
    setLoginAuth((prev) => ({ ...prev, [name]: value }));
  }
  function handleRegisterChange(name: keyof ZodSignUpTypes, value: string) {
    setRegisterAuth((prev) => ({ ...prev, [name]: value }));
  }

  function handleRegisterChangeLawyer(name: keyof ZodSignUpLawyerTypes, value: string) {
    setRegisterAuthLawyer((prev) => ({ ...prev, [name]: value }));
  }

  return {
    loginAuth,
    registerAuth,
    registerAuthLawyer,
    handleLoginChange,
    handleRegisterChange,
    handleRegisterChangeLawyer,
    loading,
    setLoading,
  };
};
