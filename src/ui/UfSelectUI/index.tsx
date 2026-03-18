import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { UfSelectProps } from "@/interfaces/interfaces";
import { useMemo, useState } from "react";
import type { UF } from "@/utils/mask";

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
  open,
  onValueChange,
  onOpenChange,
  onInteractionChange,
}: UfSelectProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const items = useMemo(() => states, []);
  const isOpen = open ?? internalOpen;
  const selectedLabel =
    items.find((item) => item.value === value)?.label ?? "Selecione UF";

  const handleOpenChange = (nextOpen: boolean) => {
    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      onInteractionChange?.(false);
    }
  };

  return (
    <View
      className="w-full"
      style={{ zIndex: 1000, elevation: 1000 }}
      onTouchStart={(event) => event.stopPropagation()}
    >
      <Text className="text-[#fff] text-[10px] font-interBold uppercase mb-[6px]">
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleOpenChange(!isOpen)}
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          borderRadius: 16,
          minHeight: 55,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text className="text-white text-[14px]" numberOfLines={1}>
          {selectedLabel}
        </Text>

        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            marginTop: 8,
            maxHeight: 200,
            backgroundColor: "#111",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
            onResponderTerminationRequest={() => false}
            onTouchStart={() => onInteractionChange?.(true)}
            onTouchEnd={() => onInteractionChange?.(false)}
            onTouchCancel={() => onInteractionChange?.(false)}
            onScrollBeginDrag={() => onInteractionChange?.(true)}
            onScrollEndDrag={() => onInteractionChange?.(false)}
            onMomentumScrollEnd={() => onInteractionChange?.(false)}
          >
            {items.map((item) => {
              const selected = item.value === value;

              return (
                <TouchableOpacity
                  key={item.value}
                  activeOpacity={0.8}
                  onPress={() => {
                    onValueChange(item.value as UF);
                    handleOpenChange(false);
                  }}
                  style={{
                    minHeight: 44,
                    justifyContent: "center",
                    paddingHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(255,255,255,0.06)",
                    backgroundColor: selected
                      ? "rgba(96,165,250,0.12)"
                      : "#111",
                  }}
                >
                  <Text
                    style={{
                      color: selected ? "#60A5FA" : "#fff",
                      fontSize: 14,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
