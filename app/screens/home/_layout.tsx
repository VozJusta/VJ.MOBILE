import { Stack } from "expo-router";
import Navbar from "../../../components/Navbar";

export default function UsersLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Navbar />
    </>
  );
}
