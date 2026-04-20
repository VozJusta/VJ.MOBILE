import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function transcribeAudio(fileUri: string) {
  const token = useAccessTokenStorage.getState().accessToken;

  try {
    const formData = new FormData();

    formData.append("file", {
      uri: fileUri,
      name: "audio_record.m4a",
      type: "audio/m4a",
    } as any);

    const response = await fetch(`${BASE_URL}/report/transcribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: data.message ? [data.message] : ["Erro ao transcrever áudio"],
      };
    }

    return {
      success: true,
      data: data.transcription,
    };
  } catch (error) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
