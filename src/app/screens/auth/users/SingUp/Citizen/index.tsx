import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { buildCitizenFields } from "@/utils/auth/users/SingUp/Citizen/data";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { buildPasswordChecklist } from "@/utils/auth/users/PasswordChecklist";
import { useAuth } from "@/hooks/useAuth";

export default function Citizen() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerAuth, handleRegisterChange } = useAuth();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const strength = useMemo(() => {
    return passwordValidate(registerAuth.password);
  }, [registerAuth.password]);

  const citizenData = buildCitizenFields({
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
    registerAuth,
    handleRegisterChange,
  });
  return (
    <SignInTemplate
      title="Cadastro de Cidadão"
      description="Faça seu cadastro para transformar sua indignação em mudança"
      fields={citizenData.fields}
      onSubmit={citizenData.onSubmit}
      submitLabel={citizenData.submitLabel}
      disableSubmit={!acceptedTerms || citizenData.disableSubmit}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: buildPasswordChecklist(registerAuth.password),
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
