import {
  IProfileResponse,
  IUpdateProfileBody,
} from "@/interfaces/services/profile";
import { getProfile } from "@/services/profile/getProfile";
import { updateAvatar } from "@/services/profile/updateAvatar";
import { updateProfile } from "@/services/profile/updateProfile";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useProfile() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const token = useAccessTokenStorage((state) => state.accessToken);
  const [isHydrated, setIsHydrated] = useState(
    useAccessTokenStorage.persist.hasHydrated(),
  );

  async function fetchProfile() {
    setLoading(true);
    try {
      const response = await getProfile();

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar perfil",
          text2: response.message,
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao carregar perfil",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = useAccessTokenStorage.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAccessTokenStorage.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  async function saveProfile(body: IUpdateProfileBody) {
    setSaving(true);
    try {
      const response = await updateProfile(body);
      console.log("Response do updateProfile:", response);
      if (response.success) {
        setProfile((prev) => (prev ? { ...prev, ...body } : prev));
        Toast.show({
          type: "success",
          text1: "Perfil atualizado",
          text2: response.data?.message || "Dados salvos com sucesso",
        });
        return { success: true };
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao salvar perfil",
          text2: response.message,
        });
        return { success: false };
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao salvar perfil",
        text2: "Tente novamente mais tarde",
      });
      return { success: false };
    } finally {
      setSaving(false);
    }
  }

  async function saveAvatar(fileUri: string, mimeType?: string) {
    setSaving(true);
    try {
      const response = await updateAvatar(fileUri, mimeType);

      if (response.success) {
        setProfile((prev) =>
          prev ? { ...prev, avatar_image: fileUri } : prev,
        );
        Toast.show({
          type: "success",
          text1: "Foto atualizada",
          text2: "Foto de perfil salva com sucesso",
        });
        return { success: true };
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar foto",
          text2: response.message,
        });
        return { success: false };
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar foto",
        text2: "Tente novamente mais tarde",
      });
      return { success: false };
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (!isHydrated || !token) {
      return;
    }

    fetchProfile();
  }, [isHydrated, token]);

  return {
    profile,
    loading,
    saving,
    fetchProfile,
    saveProfile,
    saveAvatar,
  };
}
