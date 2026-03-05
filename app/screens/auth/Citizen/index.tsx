import { useState } from "react";
import SignInTemplate from "../../../../template/auth/signInTemplate";
import { getInitialCitizenData } from "./data";
import passwordValidate from "../../../utils/passwordValidate";

export default function Citizen() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const strength = passwordValidate(password);
  // const [showPassword, setShowPassword] = useState(false);
  // const [acceptedTerms, setAcceptedTerms] = useState(false);
  // const router = useRouter();
  // const strength = passwordValidate(password);
  // const animatedWidth = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   const percentage = (strength.score / 5) * 100;

  //   Animated.timing(animatedWidth, {
  //     toValue: percentage,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  // }, [strength.score]);

  const citizenData = getInitialCitizenData(
    name, setName,
    cpf, setCpf,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    showPassword,
    () => setShowPassword((prev) => !prev)
  );

  return (
    <SignInTemplate
      {...citizenData}
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
