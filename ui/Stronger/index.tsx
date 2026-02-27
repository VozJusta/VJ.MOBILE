import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import passwordValidate from "../../app/utils/passwordValidate";

type Props = {
  password: string;
};

export function PasswordStrengthBar({ password }: Props) {
  const { score, color } = passwordValidate(password);
  const progress = useSharedValue(0);

  useEffect(() => {
    const percentage = score / 5;
    progress.value = withTiming(percentage, {
      duration: 400,
    });
  }, [score]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
      backgroundColor: color,
    };
  });

  return (
    <View className="w-full h-2 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mt-2">
      <Animated.View
        style={animatedStyle}
        className="h-full rounded-full"
      />
    </View>
  );
}