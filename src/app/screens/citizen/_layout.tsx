import { Slot } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function CitizenLayout() {
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
<<<<<<< HEAD
      <Navbar isLawyer={false} profile={false} />
=======
      <Navbar isLawyer={false} />
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
    </LinearGradient>
  );
}
