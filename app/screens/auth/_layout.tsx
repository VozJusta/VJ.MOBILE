import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <LinearGradient
      style={{ flex: 1, overflow: "hidden"  }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    
    >
      <Slot />
    </LinearGradient>
  );
}