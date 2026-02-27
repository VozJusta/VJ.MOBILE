import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import BackButton from "../../../../ui/BackButton";
import Logo from "../../../../assets/svg/icons/logo.svg";
import { Text } from "react-native";
import { AppInput } from "../../../../ui/input";
import { formatOABNumber, OAB } from "../../../../app/utils/oabValidate";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CheckListFunction from "../../../../ui/CheckListFunction";
import { Checkbox } from "../../../../ui/checkbox";
import passwordValidate from "../../../../app/utils/passwordValidate";

export default function Lawyer() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [oab, setOab] = useState<OAB>({
    uf: "SP",
    number: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const strength = passwordValidate(password);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

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
              {/* Dentro desta view preciso colocar um select para o advogado selecionar o UF da sua OAB */}
            </View>
            {/* Aqui ainda preciso colocar um select para a área do advogado 
            OBS: Abaixo desta linha de comando*/}

            <AppInput
              label="E-mail Profissional"
              placeholder="email@exemplo.com.br"
              type="email"
              value={email}
              onChangeText={setEmail}
            />

            <View>
              <AppInput
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility-off" : "visibility"}
                      size={26}
                      color="#fff"
                    />
                  </TouchableOpacity>
                }
              />
              <View className="bg-[#fff]/5 border border-[rgba(255,255,255,0.12)] rounded-[12px] p-[16px] mt-1.5">
                <Text className="text-[10px] text-[#94A3B8] pb-[8px] font-inter">
                  Força da Segurança
                </Text>
                <View className="w-full h-3 bg-[#fff]/5 rounded-full mt-1">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${(strength.score / 5) * 100}%`,
                      backgroundColor: strength.color,
                    }}
                  />
                </View>
                <View className="flex-row gap-[90px] mt-[8px]">
                  <View className="flex-col">
                    <CheckListFunction
                      valid={password.length >= 8}
                      label="8+ Caracteres"
                    />
                    <CheckListFunction
                      valid={/[@$!%*?&]/.test(password)}
                      label="Símbolo"
                    />
                  </View>
                  <View className="flex-col">
                    <CheckListFunction
                      valid={/[A-Z]/.test(password)}
                      label="Maiúscula"
                    />
                    <CheckListFunction
                      valid={/[0-9]/.test(password)}
                      label="Número"
                    />
                  </View>
                </View>
              </View>
              <Checkbox value={acceptedTerms} onChange={setAcceptedTerms}>
                <Text className="text-[#fff]/40 text-sm font-inter leading-5">
                  Aceito os{" "}
                  <Text
                    className="text-blue-500 underline font-semibold"
                    onPress={() => router.push("/terms")}
                  >
                    Termos de Uso
                  </Text>{" "}
                  e a{" "}
                  <Text
                    className="text-blue-500 underline font-semibold"
                    onPress={() => router.push("/privacy")}
                  >
                    Política de Privacidade
                  </Text>
                </Text>
              </Checkbox>
              <LinearGradient
                colors={["#135BEC", "#0A44B8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-4 mt-6"
                style={{
                  paddingVertical: 18,
                  alignItems: "center",
                  borderRadius: 16,
                }}
              >
                <TouchableOpacity className="w-full items-center">
                  <Text className="text-white font-interBold">Cadastrar</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
        <View className="items-center mt-8">
          <Text className="text-[#fff]/40 text-sm font-inter leading-5">
            Já possui registro?{" "}
            <Text
              className="text-blue-500 underline font-semibold"
              onPress={() => router.push("/login")}
            >
              Fazer Login
            </Text>{" "}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
