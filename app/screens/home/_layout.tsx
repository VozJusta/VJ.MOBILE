import { Slot } from "expo-router";
import Navbar from "../../../src/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function UsersLayout() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      <Navbar />
    </LinearGradient>
  );
}
