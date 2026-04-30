import { BASE_DID_KEY, BASE_DID_URL } from "@/settings/BASE_URL";

export async function uploadAudio(audioBlob: Blob) {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.mp3");

    const response = await fetch(`${BASE_DID_URL}/audios`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${BASE_DID_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Erro ao enviar áudio" };
    }

    return { success: true, data: data.url as string };
  } catch {
    return { success: false, error: "Erro ao enviar áudio" };
  }
}
