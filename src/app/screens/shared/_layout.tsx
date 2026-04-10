import { Slot, usePathname } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function SharedLayout() {
  const pathName = usePathname();
  const hiddenRoutes = [
    "/screens/shared/profile/myData",
    "/screens/shared/profile/help",
    "/screens/shared/profile/settings",
    "/screens/shared/profile/privacy",
  ];

  const shouldHideNavbar = hiddenRoutes.includes(pathName);
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      {!shouldHideNavbar && <Navbar isLawyer={false} profile={true} />}
    </LinearGradient>
  );
}
