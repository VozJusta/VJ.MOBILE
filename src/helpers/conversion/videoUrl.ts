import { createTalk } from "@/services/d-id/createTalk";
import { pollTalk } from "@/services/d-id/poolTalk";
import { uploadAudio } from "@/services/d-id/uploadAudio";

export async function generateJudgeVideo(audioUri: string): Promise<string | null> {
  const audioResult = await uploadAudio(audioUri);
  if (!audioResult.success || !audioResult.data) return null;

  const talkResult = await createTalk(audioResult.data);
  if (!talkResult.success || !talkResult.data) return null;

  const videoResult = await pollTalk(talkResult.data);
  if (!videoResult.success || !videoResult.data) return null;

  return videoResult.data;
}