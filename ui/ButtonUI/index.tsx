import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IButtonProps } from "../../interfaces/ui/ButtonUI";

export default function ButtonUI({
  goNext = false,
  goBack = false,
  iconLeft = false,
  ...props
}: IButtonProps) {
  return goNext || goBack ? (
    <TouchableOpacity
      className={` ${props.size} ${goNext ? "bg-BlueAzure" : "bg-white/5"} ${goBack && "border border-solid border-white/10"} rounded-full justify-center items-center `}
      onPress={props.onPress}
      style={
        goNext && {
          shadowColor: "#1E3A8A",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
          marginRight: 16,
        }
      }
    >
      {goNext ? (
        <MaterialIcons name="chevron-right" size={24} color="#fff" />
      ) : (
        <MaterialIcons name="keyboard-arrow-left" size={24} color="#fff" />
      )}
    </TouchableOpacity>
  ) : props.gradient ? (
    <LinearGradient
      className={`w-full h-[56px] overflow-hidden rounded-[16px]`}
      style={{
        borderRadius: 16,
        shadowColor: "#135BEC",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#135BEC", "#0A44B8"]}
    >
      <Pressable onPress={props.onPress} className={`w-full h-[56px]`}>
        {props.children}
      </Pressable>
    </LinearGradient>
  ) : iconLeft ? (
    <Pressable
      onPress={props.onPress}
      className={` ${props.paddingButtonStatus} rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] ${props.size} `}
    >
      <View className="w-full flex-row justify-between items-center">
        <MaterialIcons />
        <View className="flex-col gap-[2px]">
          <Text>

          </Text>
          {props.status && props}
        </View>
      </View>
    </Pressable>
  ) : (
    <Pressable
      onPress={props.onPress}
      className={` rounded-[20px] ${props.border} ${props.size || ""} ${props.hover ? ` ${props.active ? "" : "border border-[rgba(255,255,255,0.12)]"} ${props.shadow} ${props.active ? "bg-white" : "bg-[rgba(255,255,255,0.06)]"}` : ""} ${props.bg}`}
    >
      {props.children}
    </Pressable>
  );
}
