import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function updateAvatar(fileUri: string, mimeType: string = "image/jpeg") {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: fileUri,
      name: "avatar.jpg",
      type: mimeType,
    } as any);

    const response = await apiFetch(`${BASE_URL}/profile/avatar`, {
      method: "PATCH",
      body: formData,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao atualizar foto de perfil",
      };
    }

    return {
      success: true,
      data: json as { message: string },
    };
  } catch {
    return {
      success: false,
      message: "Erro de conexão com o servidor",
    };
  }
}
