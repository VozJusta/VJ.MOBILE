import { IMeResponse } from "@/interfaces/services/auth/me";

import { logout } from "@/services/auth/logout";
import { getMe } from "@/services/auth/me";
import { deleteAccount } from "@/services/auth/terminate-account";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import {
  ZodLoginTypes,
  ZodSignUpLawyerTypes,
  ZodSignUpTypes,
  ZodUpdatePasswordTypes,
} from "@/types/validation";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useAuth = () => {
  const [user, setUser] = useState<IMeResponse | undefined>(undefined);

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

  const [registerAuthLawyer, setRegisterAuthLawyer] =
    useState<ZodSignUpLawyerTypes>({
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

  function handleRegisterChangeLawyer(
    name: keyof ZodSignUpLawyerTypes,
    value: string,
  ) {
    setRegisterAuthLawyer((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await logout();

      if (response.success) {
        useAccessTokenStorage.getState().clearTokens();
        useRefreshTokenStorage.getState().clearTokens();

        router.replace("/screens/Onboarding/roles");
      } else {
        Toast.show({
          type: "error",
          text1: "Não foi possível fazer sair da conta",
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Não foi possível fazer sair da conta",
        text2: "Ocorreu um erro ao tentar fazer logout",
      });
    } finally {
      setLoading(false);
    }
  }

  async function terminateAccount(password: string) {
    setLoading(true);
    try {
      const response = await deleteAccount(password);

      if (response.success) {
        useAccessTokenStorage.getState().clearTokens();
        useRefreshTokenStorage.getState().clearTokens();

        Toast.show({
          type: "success",
          text1: "Conta encerrada",
          text2: response.message,
        });

        router.replace("/screens/Onboarding/roles");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Não foi possível encerrar a conta",
        text2: "Ocorreu um erro ao tentar encerrar a conta",
      });
    } finally {
      setLoading(false);
    }
  }

  async function authMe() {
    setLoading(true);

    try {
      const response = await getMe();

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Não foi possível obter os dados do usuário",
          text2: response.message,
        });

        return;
      }


      setUser(response.data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Não foi possível obter os dados do usuário",
        text2: "Ocorreu um erro ao tentar obter os dados do usuário",
      });
    } finally {
      setLoading(false);
    }
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
    handleLogout,
    terminateAccount,
    user,
    authMe,
  };
};
