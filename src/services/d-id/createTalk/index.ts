import { BASE_DID_KEY, BASE_DID_URL } from "@/settings/BASE_URL";

export async function createTalk(audioUrl: string) {
  try {
    const response = await fetch(`${BASE_DID_URL}/talks`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${BASE_DID_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: "https://i.ibb.co/zVJDc9GP/lawyer-illustration.png",
        script: {
          type: "audio",
          audio_url: audioUrl,
        },
        config: { stitch: true },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao criar talk",
      };
    }

    return {
      success: true,
      data: data.id as string,
    };
  } catch {
    return {
      success: false,
      error: "Erro ao criar talk",
    };
  }
}
