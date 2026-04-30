async function uploadAudio(audioBlob: Blob): Promise<string> {
  const base64 = await blobToBase64(audioBlob);

  const response = await fetch(`${DID_BASE}/audios`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${DID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audio: `data:audio/mpeg;base64,${base64}`,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Erro ao fazer upload do áudio");

  return data.url as string;
}