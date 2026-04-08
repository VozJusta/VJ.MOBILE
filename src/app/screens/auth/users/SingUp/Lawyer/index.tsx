import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { buildLawyerFields } from "@/utils/auth/users/SingUp/Lawyer/data";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { specializationOptions } from "@/utils/auth/users/Lawyer/data";



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

  function buildPasswordChecklist(
    password: string
  ): import("../../../../../../interfaces/components/PasswordStrengh").PasswordChecklistItem[] {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    const checklist = [
      {
        label: "Pelo menos 8 caracteres",
        checked: hasMinLength,
        isValid: hasMinLength,
        valid: hasMinLength,
        met: hasMinLength,
      },
      {
        label: "Uma letra maiúscula",
        checked: hasUppercase,
        isValid: hasUppercase,
        valid: hasUppercase,
        met: hasUppercase,
      },
      {
        label: "Uma letra minúscula",
        checked: hasLowercase,
        isValid: hasLowercase,
        valid: hasLowercase,
        met: hasLowercase,
      },
      {
        label: "Um número",
        checked: hasNumber,
        isValid: hasNumber,
        valid: hasNumber,
        met: hasNumber,
      },
      {
        label: "Um caractere especial",
        checked: hasSpecialChar,
        isValid: hasSpecialChar,
        valid: hasSpecialChar,
        met: hasSpecialChar,
      },
    ];

    return checklist as unknown as import("../../../../../../interfaces/components/PasswordStrengh").PasswordChecklistItem[];
  }
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