
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";

export default function RootLayout() {


  
  return (
    <>
      <StatusBar backgroundColor={"transparent"} />
      <Stack screenOptions={{ headerShown: false }} />
      <Toast
        config={{
           success: ({ text1, text2 }) => (
            <View
              style={{
                width: "70%",
                padding: 15,
                backgroundColor: "#2B2B2B",
                borderRadius: 12,
                borderLeftWidth: 6,
                borderLeftColor: "#4CAF50",
                position: "absolute",
                right: 10,
                top: 20
              }}
            >
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
                <Text style={{ fontSize: 13, color: "#ddd" }}>
                  {text2}
                </Text>
              ) : null}
            </View>
          ),

          error: ({ text1, text2 }) => (
            <View
              style={{
                width: "60%",
                padding: 15,
                backgroundColor: "#2B2B2B",
                borderRadius: 12,
                borderLeftWidth: 6,
                borderLeftColor: "#FF5252",
                position: "absolute",
                right: 10,
                top: 20
              }}
            >
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
                <Text style={{ fontSize: 13, color: "#ddd" }}>
                  {text2}
                </Text>
              ) : null}
            </View>
          ),

        }}
      />
    </>
  );
}