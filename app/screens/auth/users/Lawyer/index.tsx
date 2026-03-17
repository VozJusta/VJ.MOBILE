import { useState } from "react";
import { router } from "expo-router";
import { formatCPF } from "../../../../../utils/mask";
import SignInTemplate from "../../../../../template/auth/SingInTemplate/index";
import { getInitialLawyerData } from "./data";
import passwordValidate from "../../../../../utils/passwordValidate";
import { formatOABNumber } from "../../../../../utils/oabValidate";

export default function Lawyer() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [oabNumber, setOabNumber] = useState("");
  const [uf, setUf] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    specializations,
    setSpecializations,
    password,
    setPassword,
    showPassword,
    () => setShowPassword((prev) => !prev),
  );

  return (
    <SignInTemplate
      {...lawyerData}
      onSubmit={() =>
        router.push(
          `/screens/auth/Validate?source=lawyer&email=${encodeURIComponent(email)}`,
        )
      }
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
