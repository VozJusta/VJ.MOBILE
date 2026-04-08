import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";
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

  function buildPasswordChecklist(
    password: string
  ): import("../../../../../../interfaces/components/PasswordStrengh").PasswordChecklistItem[] {
    type PasswordChecklistItem =
      import("../../../../../../interfaces/components/PasswordStrengh").PasswordChecklistItem;

    const rules = [
      {
        label: "+8 caracteres",
        test: (value: string) => value.length >= 8,
      },
      {
        label: "Maiúscula",
        test: (value: string) => /[A-Z]/.test(value),
      },
      {
        label: "Minúscula",
        test: (value: string) => /[a-z]/.test(value),
      },
      {
        label: "Número",
        test: (value: string) => /\d/.test(value),
      },
      {
        label: "Símbolo",
        test: (value: string) => /[^A-Za-z0-9]/.test(value),
      },
    ];

    return rules.map(({ label, test }) => {
      const passed = test(password);

      return {
        label,
        isValid: passed,
        valid: passed,
        checked: passed,
      } as PasswordChecklistItem;
    });
  }
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