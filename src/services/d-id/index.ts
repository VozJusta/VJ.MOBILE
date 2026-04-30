import { blobToBase64 } from "@/helpers/conversion/blobToBase64";
import { BASE_DID_KEY, BASE_DID_URL } from "@/settings/BASE_URL";

async function uploadAudio(audioBlob: Blob) {
  const base64 = await blobToBase64(audioBlob);
  try {
    const response = await fetch(`${BASE_DID_URL}/audios`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${BASE_DID_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: `data:audio/mpeg;base64,${base64}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao enviar áudio",
      };
    }

    return {
      success: true,
      data: data.url as string,
    };
  } catch {
    return {
      success: false,
      error: "Erro ao enviar áudio",
    };
  }
}
