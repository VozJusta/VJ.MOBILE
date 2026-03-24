import {
  useFonts as useGoogleFonts,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_300Light,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import { Montserrat_700Bold } from "@expo-google-fonts/montserrat"

export const useAppFonts = () => {
  const [fontsLoadedGoogle] = useGoogleFonts({
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_400Regular,
    Montserrat_700Bold,
    Inter_300Light,
    Inter_800ExtraBold,
  });
  return fontsLoadedGoogle
};
