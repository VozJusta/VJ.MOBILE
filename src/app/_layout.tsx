import "@/styles/global.css";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { View, Text, ScrollView } from "react-native";
import { useAppFonts } from "@/assets/fonts/font";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAccessTokenStorage } from "@/store/token.store";
import { useEffect } from "react";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const accessToken = useAccessTokenStorage((state) => state.accessToken);
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    const timeout = setTimeout(() => {
    if (accessToken) {
      router.replace("/screens/citizen/home");
    }

    return () => clearTimeout(timeout);
  }, 300);
  }, [accessToken, navigationState?.key]);

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
      <Toast
        config={{
          success: ({ text1, text2 }) => (
            <LinearGradient
              style={{
                width: "95%",
                padding: 15,
                borderRadius: 12,
                position: "absolute",
                top: 20,
                gap: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              colors={["#13332B", "#151E2C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.4]}
            >
              <MaterialIcons name="check-circle" color={"#4CAF50"} size={24} />
              <View className="flex-1">
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: 3,
                  }}
                >
                  {text1}
                </Text>

                {text2 ? (
                  <Text style={{ fontSize: 13, color: "#ddd" }}>{text2}</Text>
                ) : null}
              </View>
            </LinearGradient>
          ),

          error: ({ text1, text2 }) => (
            <LinearGradient
              style={{
                width: "95%",
                padding: 15,
                borderRadius: 12,
                position: "absolute",
                gap: 8,
                top: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
              colors={["#2F1C29", "#151E2C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.4]}
            >
              <MaterialIcons name="error" size={24} color={"#FF5252"} />

              <View className="flex-1">
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: 3,
                  }}
                >
                  {text1}
                </Text>

                {text2 ? (
                  <Text style={{ fontSize: 13, color: "#ddd" }}>{text2}</Text>
                ) : null}
              </View>
            </LinearGradient>
          ),
        }}
      />
    </>
  );
}
