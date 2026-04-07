import { useState } from "react";
import SignInTemplate from "@/template/auth/SingInTemplate";
import { getInitialSignInData } from "@/utils/auth/users/SingIn/data";
import { useRouter } from "expo-router";
import { useRolesStorage } from "@/store/roles.store";
import Toast from "react-native-toast-message";
import { SingInCitizen } from "@/settings/users/citizen/SingIn";
import { resolveRoleFromApi } from "@/utils/auth/resolveRole";

export default function SignIn() {
  const router = useRouter();
  const setRole = useRolesStorage((state) => state.setRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInData = getInitialSignInData(
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    () => setShowPassword((prev) => !prev),
  );

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await SingInCitizen({ email, password });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.fields?.[0] ?? "Falha no login",
        });
        return;
      }

      const resolvedRole = resolveRoleFromApi(response.data, "citizen");
      setRole(resolvedRole);

      router.replace(
        resolvedRole === "lawyer"
          ? "/screens/lawyer/home"
          : "/screens/citizen/home",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SignInTemplate
      {...signInData}
      onSubmit={handleSubmit}
      submitLabel={loading ? "Entrando..." : signInData.submitLabel}
      disableSubmit={loading}
    />
  );
}
