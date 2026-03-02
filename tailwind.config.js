import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./ui/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}", "./template/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "BrightBlue" : "#052F5F",
        "WarmYellow" : "#FDD835",
        "Carmin Red" : "#E63946",
        "EconGreen900" : "#59B666",
        "DarkTeal" : "#052F5F",
        "White" : "#FFFFFF",
        "Placeholder" : "475569",
        "BlueRoyal" : "#02A6FF",
        "BlueAzure": "#135BEC"
      },
       boxShadow: {
        Button: {
          shadowColor: "#135BEC",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 8,
        },
      },
      fontFamily: {
        inter: "Inter_500Medium",
        interBold: "Inter_700Bold",
        interSemiBold: "Inter_600SemiBold",
        interRegular: "Inter_400Regular",
        interLight: "Inter_300Light",
        interExtraBold: "Inter_800ExtraBold",
        montserratBold: "Montserrat_700Bold"
      }
    },
  },
  plugins: [],
};
