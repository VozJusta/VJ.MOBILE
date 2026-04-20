import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { getBarHeight } from "@/utils/components/ButtonAudio";

interface AnimatedBarProps {
  meteringVoice: number;
  baseHeight: number;
  modifier?: number;
}

export function AnimatedAudioBar({
  meteringVoice,
  baseHeight,
  modifier = 1,
}: AnimatedBarProps) {
  const targetHeight = getBarHeight(baseHeight, modifier, meteringVoice);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(targetHeight, {
        duration: 120,
        easing: Easing.out(Easing.ease),
      }),
    };
  }, [meteringVoice]);

  return (
    <Animated.View
      className="w-2 bg-[#2563EB] rounded-full"
      style={animatedStyles}
    />
  );
}
