import { LinearGradient } from "expo-linear-gradient"
import Logo from "../../../assets/svg/icons/logo.svg"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    return(
            <LinearGradient
              style={{ flex: 1 }}
              className="flex-1 pt-[58px]"
              start={{ x: 0, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              colors={["#000000", "#052F5F"]}
            >
                <SafeAreaView style={{ flex: 1 }}>

                </SafeAreaView>
            </LinearGradient>
    )
}