import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { buildCitizenFields } from "@/utils/auth/users/SingUp/Citizen/data";
import SignInTemplate from "@/template/auth/SingInTemplate";

export default function Citizen() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const strength = useMemo(() => passwordValidate(password), [password]);

  
  return (
    <SignInTemplate
      title="Cadastro de Cidadão"
      description="Faça seu cadastro para transformar sua indignação em mudança"
      fields={buildCitizenFields({
        showPassword,
        onToggleShowPassword: () => setShowPassword((prev) => !prev),
        registerAuth: { fullName, cpf, phone, email, password },
        handleRegisterChange: (name, value) => {
          switch (name) {
            case "fullName":
              setFullName(value);
              break;
            case "cpf":
              setCpf(value);
              break;
            case "phone":
              setPhone(value);
              break;
            case "email":
              setEmail(value);
              break;
            case "password":
              setPassword(value);
              break;
          }
        },
      })}
      onSubmit={() => router.replace("/screens/citizen/home")}
      submitLabel="Cadastrar"
      disableSubmit={!acceptedTerms}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: strength.checklist,
      }}
      extraActions={
        <Checkbox value={acceptedTerms} onChange={setAcceptedTerms}>
          <Text className="text-[#fff]/40 text-sm font-inter leading-5">
            Aceito os{" "}
            <Text
              className="text-[#fff]/80 underline font-semibold"
              onPress={() => router.push("/screens/shared/terms")}
            >
              Termos de Uso
            </Text>
          </Text>
        </Checkbox>
      }
      footer={
        <Text className="text-[#64748B] text-[14px] font-interRegular">
          Já possui registro?{" "}
          <Text
            className="text-white underline font-interBold"
            onPress={() => router.push("/screens/auth/users/SingIn")}
          >
            Fazer Login
          </Text>
        </Text>
      }
    />
  );
}
