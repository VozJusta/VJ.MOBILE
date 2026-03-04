import { useEffect, useRef } from "react";
import { useState } from "react";
import passwordValidate from "../../../utils/passwordValidate";
import { useRouter } from "expo-router";
import SignInTemplate from "../../../../template/auth/signInTemplate";
import { getInitialCitizenData } from "./data";

export default function Citizen() {
  const [name, setName] = useState("");
  // const [cpf, setCpf] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
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

  const citizenData = getInitialCitizenData(name, setName);

  return (
    <SignInTemplate {...citizenData} />
  );
}
