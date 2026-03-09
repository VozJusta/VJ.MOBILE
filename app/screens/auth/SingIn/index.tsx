import { useState } from "react";
import SignInTemplate from "../../../../template/auth/signInTemplate";
import { getInitialSignInData } from "./data";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const signInData = getInitialSignInData(
		email,
		setEmail,
		password,
		setPassword,
		showPassword,
		() => setShowPassword((prev) => !prev)
	);

	return (
		<SignInTemplate {...signInData} />
	);
}
