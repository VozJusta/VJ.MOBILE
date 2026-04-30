import { BASE_DID_KEY, BASE_DID_URL } from "@/settings/BASE_URL";

export async function pollTalk(talkId: string) {
  const maxAttempts = 20;
  const interval = 2000;

  try {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((res) => setTimeout(res, interval));

      const response = await fetch(`${BASE_DID_URL}/talks/${talkId}`, {
        headers: {
          Authorization: `Basic ${BASE_DID_KEY}`,
        },
      });

      const data = await response.json();

      if (data.status === "done") {
        return {
          success: true,
          data: data.result_url as string,
        };
      }

      if (data.status === "error") {
        return {
          success: false,
          data: "Erro ao processar vídeo",
        };
      }
    }
  } catch {
    return {
      success: false,
      data: "Erro ao processar vídeo",
    };
  }
}
