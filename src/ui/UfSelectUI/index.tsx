import { Text, View } from "react-native";
import { UfSelectProps } from "@/interfaces/interfaces";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useMemo } from "react";
import type { UF } from "@/utils/mask";

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
  const [open, setOpen] = useState(false);

  // 🔥 mantém seu array intacto, só memoiza
  const items = useMemo(() => states, []);

  return (
    <View className="w-full" style={{ zIndex: 1000 }}>
      <Text className="text-[#fff] text-[10px] font-interBold uppercase mb-[6px]">
        {label}
      </Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(value);
          onValueChange(newValue);
        }}
        setItems={() => {}}
        placeholder="Selecione UF"
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.1)",
          borderRadius: 16,
          minHeight: 55,
        }}
        textStyle={{
          color: "white",
        }}
        dropDownContainerStyle={{
          backgroundColor: "#111",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        maxHeight={200}
      />
    </View>
  );
}
