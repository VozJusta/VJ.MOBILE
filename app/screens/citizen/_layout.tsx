import { Slot, usePathname } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function UsersLayout() {
  const pathName = usePathname()
  console.log(pathName)
   const hideNavbar = pathName === "/screens/citizen/home/listCases";
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      {!hideNavbar && <Navbar />}
    </LinearGradient>
  );
}
