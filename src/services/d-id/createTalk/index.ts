import * as FileSystem from "expo-file-system/legacy";

const HF_SPACE_URL = "https://ooliveiratg-gradio-lipsync-wav2lip.hf.space";
const FACE_IMAGE_URL = "https://i.ibb.co/zVJDc9GP/lawyer-illustration.png";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createTalk(audioUri: string) {
  try {
    // 1. Download da imagem
    const imageLocalUri = FileSystem.cacheDirectory + "face.jpg";
    await FileSystem.downloadAsync(FACE_IMAGE_URL, imageLocalUri);

    // 2. Upload imagem
    const imageForm = new FormData();
    imageForm.append("files", {
      uri: imageLocalUri,
      type: "image/jpeg",
      name: "face.jpg",
    } as any);
    const imageUpload = await fetch(`${HF_SPACE_URL}/upload`, {
      method: "POST",
      body: imageForm,
    });
    const [imagePath] = await imageUpload.json();

    // 3. Upload áudio
    const audioForm = new FormData();
    audioForm.append("files", {
      uri: audioUri,
      type: "audio/mpeg",
      name: "audio.mp3",
    } as any);
    const audioUpload = await fetch(`${HF_SPACE_URL}/upload`, {
      method: "POST",
      body: audioForm,
    });
    const [audioPath] = await audioUpload.json();

    // 4. Criar job
    const sessionHash = Math.random().toString(36).substring(2);

    const joinResponse = await fetch(`${HF_SPACE_URL}/queue/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fn_index: 0,
        data: [
          {
            path: imagePath,
            orig_name: "face.jpg",
            meta: { _type: "gradio.FileData" },
          },
          {
            path: audioPath,
            orig_name: "audio.mp3",
            meta: { _type: "gradio.FileData" },
          },
          "wav2lip",
          false,
          1,
          0,
          10,
          0,
          0,
        ],
        session_hash: sessionHash,
      }),
    });

    const joinData = await joinResponse.json();
    console.log("join response:", JSON.stringify(joinData));

    // 5. Polling via SSE
    const b64Video = await new Promise<string>((resolve, reject) => {
      const poll = async () => {
        for (let i = 0; i < 40; i++) {
          await new Promise((r) => setTimeout(r, 3000));

          try {
            const res = await fetch(
              `${HF_SPACE_URL}/queue/data?session_hash=${sessionHash}`,
              { headers: { Accept: "text/event-stream" } },
            );

            const text = await res.text();
            console.log(`poll ${i} full response:`, text);

            const rawLines = text.split("\n");
            let currentData = "";

            for (const line of rawLines) {
              if (line.startsWith("data:")) {
                currentData = line.replace(/^data:\s*/, "").trim();
              } else if (line.trim() === "" && currentData) {
                try {
                  const json = JSON.parse(currentData);
                  console.log("SSE msg:", json.msg);

                  if (json.msg === "process_completed") {
                    const output = json.output?.data;
                    console.log("output completo:", JSON.stringify(output));

                    const b64 = output?.[1];
                    if (b64) {
                      resolve(b64);
                      return;
                    }
                    reject(new Error("base64 não encontrado na resposta"));
                    return;
                  }

                  if (
                    json.msg === "queue_full" ||
                    json.msg === "process_error"
                  ) {
                    reject(new Error(json.msg));
                    return;
                  }
                } catch {
                  // bloco malformado, ignora
                }
                currentData = "";
              }
            }
          } catch (fetchErr) {
            console.warn(`poll ${i} fetch error:`, fetchErr);
          }
        }
        reject(new Error("Timeout após 40 tentativas"));
      };

      poll().catch(reject);
    });

    // 6. Salva base64 direto no cache
    const localUri =
      FileSystem.cacheDirectory + `judge_video_${Date.now()}.mp4`;
    await FileSystem.writeAsStringAsync(localUri, b64Video, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const info = await FileSystem.getInfoAsync(localUri);
    console.log("arquivo salvo, tamanho:", (info as any).size);

    if (!info.exists || (info as any).size < 1000) {
      console.error("Arquivo inválido após download");
      return { success: false, data: null };
    }

    console.log("Vídeo salvo em:", localUri);
    return { success: true, data: localUri };
  } catch (e) {
    console.error("createTalk error:", e);
    return { success: false, data: null };
  }
}
