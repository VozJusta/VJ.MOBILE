import "@/styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { View, Text, ScrollView } from "react-native";
import { useAppFonts } from "@/assets/fonts/font";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
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
                width: "98%",
                padding: 15,
                backgroundColor: "#2B2B2B",
                borderRadius: 12,
                borderLeftWidth: 6,
                borderLeftColor: "#4CAF50",
                position: "absolute",
                top: 20,
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
              }}
              colors={["#1A3530", "#1A2E28"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons name="check-circle" color={"#4CAF50"} size={24} className="border-[6px] rounded-full border-[#303746]" />
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
            </LinearGradient>
          ),

          error: ({ text1, text2 }) => (
            <LinearGradient
              style={{
                width: "98%",
                padding: 15,
                backgroundColor: "#2B2B2B",
                borderRadius: 12,
                borderLeftWidth: 6,
                borderLeftColor: "#FF5252",
                position: "absolute",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                top: 20,
              }}
              colors={["#3A1A1A", "#2E1A1A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons
                name="error"
                size={24}
                color={"#FF5252"}
                className="border-[6px] rounded-full border-[#303746]"
              />
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
            </LinearGradient>
          ),
        }}
      />
    </>
  );
}
