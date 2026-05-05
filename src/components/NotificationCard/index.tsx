import { Text, View } from "react-native";
import TypeNotificationCard from "../TypeNotificationCard";
import { TNotificationCard } from "@/interfaces/components/NotificationCard";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function NotificationCard({ ...props }: TNotificationCard) {
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const cardHeight = useSharedValue(80);
  const marginBottom = useSharedValue(8);

  useEffect(() => {
    opacity.value = withTiming(props.isRead ? 0.5 : 1, { duration: 400 });
  }, [props.isRead]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: cardHeight.value,
    marginBottom: marginBottom.value,
    overflow: "hidden",
  }));

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDelete = () => {
    if (props.onDelete) props.onDelete();
  };

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX < -100) {
        translateX.value = withTiming(-500, { duration: 300 });
        cardHeight.value = withTiming(0, { duration: 300 });
        marginBottom.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(handleDelete)();
        });
      } else {
        translateX.value = withTiming(0, { duration: 300 });
      }
    });
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={animatedContainerStyle}
    >
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[swipeStyle, animatedStyle]}>
          <View className="absolute right-0 top-0 bottom-0 w-24 items-center justify-center bg-red-500/80 rounded-2xl">
            <Text className="text-white font-interSemiBold text-[12px]">
              Excluir
            </Text>
          </View>

          <View className="p-4 flex flex-row items-center w-full h-fit bg-[#FFFFFF]/3 gap-4 rounded-2xl border-1 border-[#FFFFFF]/8">
            <TypeNotificationCard {...props} />
            <View className="flex-1 flex-col gap-1">
              <View className="flex flex-row items-center justify-between w-fit h-fit gap-2">
                <Text className="font-interBold text-[14px] text-white truncate w-fit">
                  {props.title}
                </Text>
                <Text className="font-interRegular text-[12px] text-[#94A3B8] w-fit">
                  {props.date.toLocaleDateString()}
                </Text>
              </View>
              <Text
                className="font-interRegular text-[12px] text-[#94A3B8] w-fit h-fit"
                numberOfLines={2}
              >
                {props.description}
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
