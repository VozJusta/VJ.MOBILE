import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";


type Props = {
    label: String;
}


const careerAreas: { label: string; }[] = [
    { label: "          Selecione sua área" },

];




export default function CareerSelect({ label }: Props) {
    return (
        <View>
            <Text className="uppercase text-[10px] mb-1.5 font-interBold text-white">{label}</Text>
            <View className="rounded-[12px] border-[1px] border-[rgba(255,255,255,0.12)] bg-[rgba(175,43,43,0.03)] h-55 min-w-[45%] w-45% justify-center">
                <MaterialIcons name="gavel" size={24} color="#fff" className="absolute left-3" />
                <Picker
                    dropdownIconColor="#fff"
                    style={{ color: "white",  }}
                    selectedValue={""}>

                    <Picker.Item
                        key={careerAreas[0].label}
                        label={careerAreas[0].label}
                        value={careerAreas[0].label}
                        color="#000"
                    />
                </Picker>
            </View>
        </View>
    )
}