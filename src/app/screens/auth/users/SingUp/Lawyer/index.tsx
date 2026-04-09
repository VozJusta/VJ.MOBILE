import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { buildLawyerFields } from "@/utils/auth/users/SingUp/Lawyer/data";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { specializationOptions } from "@/utils/auth/users/Lawyer/data";
import { buildPasswordChecklist } from "@/utils/auth/users/PasswordChecklist";



export default function Lawyer() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [oabNumber, setOabNumber] = useState("");
  const [uf, setUf] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const strength = useMemo(() => passwordValidate(password), [password]);

  return (
    <SignInTemplate
      title="Cadastro de Advogado"
      description="Solicite seu acesso profissional para começar a atender cidadãos na plataforma."
      fields={buildLawyerFields({
        showPassword,
        onToggleShowPassword: () => setShowPassword((prev) => !prev),
        registerAuth: { fullName, cpf, oabNumber, uf, specialization, email, password },
        handleRegisterChange: (name, value) => {
          switch (name) {
            case "fullName":
              setFullName(value);
              break;
            case "cpf":
              setCpf(value);
              break;
            case "oabNumber":
              setOabNumber(value);
              break;
            case "uf":
              setUf(value);
              break;
            case "specialization":
              setSpecialization(value);
              break;
            case "email":
              setEmail(value);
              break;
            case "password":
              setPassword(value);
              break;
          }
        },
        specializationOptions: specializationOptions.map((spec) => ({
          label: spec,
          value: spec,
        })),
      })}
      onSubmit={() => {}}
      submitLabel="Cadastrar"
      disableSubmit={!acceptedTerms}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: buildPasswordChecklist(password),
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
