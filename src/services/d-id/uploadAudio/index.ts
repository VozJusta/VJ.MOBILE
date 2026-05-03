import { BASE_DID_KEY, BASE_DID_URL } from "@/settings/BASE_URL";

export async function uploadAudio(audioUri: string) {
  try {
    const formData = new FormData();
    formData.append("audio", {
      uri: audioUri,
      type: "audio/mpeg",
      name: "audio.mp3",
    } as any);

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
  } catch (e) {
    console.error("uploadAudio error:", e);
    return { success: false, error: "Erro ao enviar áudio" };
  }
}
