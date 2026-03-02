import { Text, View } from "react-native";
import { UfSelectProps } from "../../interfaces/interfaces";
import { Picker } from "@react-native-picker/picker";
import type { UF } from "../../app/utils/mask";

const states: { label: string; value: UF }[] = [
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
    <View>
      <Text className="uppercase text-[10px] mb-1.5 font-interBold text-white">
        {label}
      </Text>
      <View className="rounded-[12px] border-[1px] border-[rgba(255,255,255,0.12)] bg-[rgba(175,43,43,0.03)] h-55 min-w-[45%] w-45% justify-center">
        <Picker itemStyle={{ color: "white" }} selectedValue={value} onValueChange={onValueChange}>
          {states.map((state) => (
            <Picker.Item
              key={state.value}
              label={state.label}
              value={state.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
