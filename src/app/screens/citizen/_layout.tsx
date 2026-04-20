import { Slot, usePathname } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function CitizenLayout() {
  const pathName = usePathname();
  const navbarRoutes = [
    "/screens/citizen/chat",
    "/screens/citizen/home",
    "/screens/citizen/documents",
  ];

  return (
    <LinearGradient
      style={{ flex: 1, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      {
        navbarRoutes.includes(pathName) && (
          <Navbar isLawyer={false} profile={true} />
        ) 
      }
    </LinearGradient>
  );
}
