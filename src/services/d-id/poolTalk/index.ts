export async function pollTalk(videoUrl: string) {
  if (videoUrl && (videoUrl.startsWith("http") || videoUrl.startsWith("file://"))) {
    return { success: true, data: videoUrl };
  }
  return { success: false, data: "URL de vídeo inválida" };
}