import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const UF_OPTIONS = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
] as const;

export type UF = (typeof UF_OPTIONS)[number]["value"];

type Props = {
  value: UF | "";
  onChange: (uf: UF) => void;
  label?: string;
};

export default function UfSelect({ value, onChange, label }: Props) {
  return (
    <View className="border-[1px] h-[62px] border-[rgba(255,255,255,0.12)] items-center justify-center">
      <Text className="flex-start   text-white text-[14px] uppercase font-inter leading-7 mb-2">
        {label || "UF"}
      </Text>
      <Picker
        
        style={{ width: 200, height: 50 }}
        onValueChange={(itemValue) => onChange(itemValue as UF)}
      >
        {UF_OPTIONS.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
}
