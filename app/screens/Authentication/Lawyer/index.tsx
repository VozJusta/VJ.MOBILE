import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import BackButton from "../../../../ui/BackButton";
import Logo from "../../../../assets/svg/icons/logo.svg";
import { Text } from "react-native";
import { AppInput } from "../../../../ui/input";
import { formatOABNumber, OAB } from "../../../../app/utils/oabValidate";

export default function Lawyer() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [oab, setOab] = useState<OAB>({
    uf: "SP",
    number: "",
  });

  return (
    <LinearGradient
      className="flex-1 pt-[58px] overflow-hidden"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row justify-between items-center px-4 mb-8">
          <BackButton />
          <Logo width={40} height={29} />
        </View>

        <View className="self-center w-[90%] mt-8 flex-col px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-11">
          <View className="flex-col gap-2">
            <Text className="text-white text-[24px] font-interBold ">
              Cadastro de Advogado
            </Text>

            <Text className="text-[#94A3B8] text-[14px] font-interRegular leading-7">
              Solicite seu acesso profissional para começar a atender cidadãos
              na plataforma.
            </Text>
          </View>

          <View className="flex-col gap-6">
            <AppInput
              label="Nome Completo"
              placeholder="Nome Completo"
              type="name"
              value={name}
              onChangeText={setName}
            />

            <AppInput
              label="CPF"
              placeholder="CPF"
              type="cpf"
              value={cpf}
              onChangeText={setCpf}
            />

            <View className="flex-row justify-between items-center gap-4">
              <AppInput
                label="000.000"
                type="cpf"
                value={oab.number}
                keyboardType="numeric"
                maxLength={7}
                onChangeText={(text) =>
                  setOab((prev) => ({
                    ...prev,
                    number: formatOABNumber(text),
                  }))
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
