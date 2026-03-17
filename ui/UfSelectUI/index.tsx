import { Text, View } from "react-native";
import { UfSelectProps } from "../../interfaces/interfaces";
import { Picker } from "@react-native-picker/picker";
import type { UF } from "../../utils/mask";

const states: { label: string; value: UF }[] = [
  { label: "UF", value: undefined as any },
  { label: "Acre (AC)", value: "AC" },
  { label: "Alagoas (AL)", value: "AL" },
  { label: "Amapá (AP)", value: "AP" },
  { label: "Amazonas (AM)", value: "AM" },
  { label: "Bahia (BA)", value: "BA" },
  { label: "Ceará (CE)", value: "CE" },
  { label: "Distrito Federal (DF)", value: "DF" },
  { label: "Espírito Santo (ES)", value: "ES" },
  { label: "Goiás (GO)", value: "GO" },
  { label: "Maranhão (MA)", value: "MA" },
  { label: "Mato Grosso (MT)", value: "MT" },
  { label: "Mato Grosso do Sul (MS)", value: "MS" },
  { label: "Minas Gerais (MG)", value: "MG" },
  { label: "Pará (PA)", value: "PA" },
  { label: "Paraíba (PB)", value: "PB" },
  { label: "Paraná (PR)", value: "PR" },
  { label: "Pernambuco (PE)", value: "PE" },
  { label: "Piauí (PI)", value: "PI" },
  { label: "Rio de Janeiro (RJ)", value: "RJ" },
  { label: "Rio Grande do Norte (RN)", value: "RN" },
  { label: "Rio Grande do Sul (RS)", value: "RS" },
  { label: "Rondônia (RO)", value: "RO" },
  { label: "Roraima (RR)", value: "RR" },
  { label: "Santa Catarina (SC)", value: "SC" },
  { label: "São Paulo (SP)", value: "SP" },
  { label: "Sergipe (SE)", value: "SE" },
  { label: "Tocantins (TO)", value: "TO" },
];

export default function UfSelect({
  label,
  value,
  onValueChange,
}: UfSelectProps) {
  return (
    <View className="w-full ">
      <Text className="text-[#fff] text-[10px] font-interBold uppercase mb-[6px]">
        {label}
      </Text>
      <View className="w-full h-[55px] px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] justify-center">
        <Picker
          dropdownIconColor="#fff"
          style={{ color: "white", height: 55 }}
          selectedValue={value}
          onValueChange={onValueChange}
          
        >
          {states.map((state) => (
            <Picker.Item
              key={state.value}
              label={state.label}
              value={state.value}
              color="#000"

            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
