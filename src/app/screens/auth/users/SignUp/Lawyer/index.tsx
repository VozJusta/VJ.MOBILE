import { useMemo, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import Checkbox from "@/ui/CheckboxUI";
import passwordValidate from "@/utils/passwordValidate";
import { buildLawyerFields } from "@/utils/auth/users/SingUp/Lawyer/data";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { specializationOptions } from "@/utils/auth/users/Lawyer/data";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/auth/useAuth";
import { ILawyerRegisterData } from "@/interfaces/store/auth/users/lawyer";

export default function Lawyer() {
  const { registerAuthLawyer, handleRegisterChangeLawyer } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const strength = useMemo(
    () => passwordValidate(registerAuthLawyer.password),
    [registerAuthLawyer.password],
  );
  const registerAuth = buildLawyerFields({
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
    registerAuth: registerAuthLawyer as ILawyerRegisterData,
    handleRegisterChange: handleRegisterChangeLawyer,
    specializationOptions: specializationOptions.map((spec) => ({
      label: spec.label,
      value: spec.value,
    })),
  });

  return (
    <SignInTemplate
      title="Cadastro de Advogado"
      description="Solicite seu acesso profissional para começar a atender cidadãos na plataforma."
      fields={registerAuth.fields}
      onSubmit={() => {
        if (!acceptedTerms) {
          Toast.show({
            type: "error",
            text1: "Aceite os termos para prosseguir com o cadastro",
          });
          return;
        }
        registerAuth.onSubmit();
      }}
      submitLabel={registerAuth.titleButton}
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
            onPress={() => router.push("/screens/auth/users/SignIn/")}
          >
            Fazer Login
          </Text>
        </Text>
      }
    />
  );
}
