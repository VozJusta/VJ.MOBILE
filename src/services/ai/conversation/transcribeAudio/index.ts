import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function transcribeAudio(fileUri: string) {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: fileUri,
      name: "audio_record.m4a",
      type: "audio/m4a",
    } as any);

    const response = await apiFetch(`${BASE_URL}/report/transcribe`, {
      method: "POST",
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
