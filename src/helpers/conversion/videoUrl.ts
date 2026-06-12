import { createTalk } from "@/services/d-id/createTalk";
import { pollTalk } from "@/services/d-id/poolTalk";

export async function generateJudgeVideo(audioUri: string): Promise<string | null> {
  const talkResult = await createTalk(audioUri); 
  if (!talkResult.success || !talkResult.data) return null;

  const videoResult = await pollTalk(talkResult.data);
  if (!videoResult.success || !videoResult.data) return null;

  return videoResult.data;
}