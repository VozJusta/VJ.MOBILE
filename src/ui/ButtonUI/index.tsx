import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IButton } from "@/interfaces/ui/ButtonUI";

export default function ButtonUI({
  goNext = false,
  goBack = false,
  gradient = false,
  hover = false,
  ...props
}: IButton) {
  const isNavigation = goNext || goBack;

  if (isNavigation) {
    return (
      <TouchableOpacity
        className={`
          ${props.size}
          ${goNext ? "bg-BlueAzure" : "bg-white/5 border border-solid border-white/10"}
          rounded-full justify-center items-center
        `}
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
        <MaterialIcons
          name={goNext ? "chevron-right" : "keyboard-arrow-left"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        className="w-full h-[56px] overflow-hidden rounded-[16px]"
        style={{
          borderRadius: 16,
          shadowColor: "#135BEC",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 15,
          elevation: 8,
          opacity: props.disabled ? 0.5 : 1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#135BEC", "#0A44B8"]}
      >
        <Pressable
          disabled={props.disabled}
          onPress={props.onPress}
          className="w-full h-[56px]"
        >
          {props.children}
        </Pressable>
      </LinearGradient>
    );
  }

  return (
    <Pressable
      onPress={props.onPress}
      className={`
        rounded-[20px]
        ${props.border ?? ""}
        ${props.size ?? ""}
        ${
          hover
            ? `${props.active ? "" : "border border-[rgba(255,255,255,0.12)]"} ${props.active ? "bg-white" : "bg-[rgba(255,255,255,0.06)]"}`
            : ""
        }
        ${props.bg ?? ""}
      `}
    >
      {props.children}
    </Pressable>
  );
}
