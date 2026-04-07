import { useState } from "react";
import { router } from "expo-router";
import { formatCPF } from "@/utils/mask";
import SignInTemplate from "@/template/auth/SingInTemplate/index";
import { getInitialLawyerData } from "@/utils/auth/users/SingUp/Lawyer/data";
import passwordValidate from "@/utils/passwordValidate";
import { formatOABNumber } from "@/utils/oabValidate";
import Toast from "react-native-toast-message";
import { SingUpLawyer } from "@/settings/users/lawyer/SingUp";
import { resolveRoleFromApi } from "@/utils/auth/resolveRole";
import { useRolesStorage } from "@/store/roles.store";
import { Email2FA } from "@/settings/users/citizen/email2FA";

export default function Lawyer() {
  const setRole = useRolesStorage((state) => state.setRole);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [oabNumber, setOabNumber] = useState("");
  const [uf, setUf] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = passwordValidate(password);

  const lawyerData = getInitialLawyerData(
    name,
    setName,
    cpf,
    (text) => setCpf(formatCPF(text)),
    oabNumber,
    (text) => setOabNumber(formatOABNumber(text)),

    email,
    setEmail,
    uf,
    setUf,
    specialization,
    setSpecialization,
    password,
    setPassword,
    showPassword,
    () => setShowPassword((prev) => !prev),
  );

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await SingUpLawyer({
        fullName: name,
        cpf,
        oabNumber,
        uf,
        specialization,
        email,
        password,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.fields?.[0] ?? "Erro ao cadastrar advogado",
        });
        return;
      }

      const resolvedRole = resolveRoleFromApi(response.data, "lawyer");
      setRole(resolvedRole);

      const validateEmail2FA = await Email2FA(email);
      if (!validateEmail2FA.success) {
        Toast.show({
          type: "error",
          text1: validateEmail2FA.fields?.[0] ?? "Falha ao enviar codigo",
        });
        return;
      }

      router.push(
        `/screens/auth/Validate?source=${resolvedRole}&email=${encodeURIComponent(email)}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SignInTemplate
      {...lawyerData}
      onSubmit={handleSubmit}
      submitLabel={loading ? "carregando..." : "continuar"}
      disableSubmit={loading}
      passwordStrength={{
        score: strength.score,
        color: strength.color,
        checklist: [
          {
            label: "8+ Caracteres",
            valid: password.length >= 8,
          },
          {
            label: "Símbolo",
            valid: /[@$!%*?&]/.test(password),
          },
          {
            label: "Maiúscula",
            valid: /[A-Z]/.test(password),
          },
          {
            label: "Número",
            valid: /[0-9]/.test(password),
          },
        ],
      }}
    />
  );
}
