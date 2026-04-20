export const getBarHeight = (
  baseHeight: number,
  modifier: number = 1,
  meteringVoice: number,
) => {
  const normalizedVolume = Math.max(
    0,
    Math.min(100, (meteringVoice + 160) * (100 / 160)),
  );

  const dynamicHeight = Math.max(
    4,
    (normalizedVolume / 100) * baseHeight * modifier,
  );
  return dynamicHeight;
};

export const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
