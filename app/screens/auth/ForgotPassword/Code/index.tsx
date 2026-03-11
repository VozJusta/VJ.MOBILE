import { useState } from "react";
import { ScreensForgotPassword } from "../../../../../interfaces/interfaces";
import { ForgotPasswordTemplate } from "../../../../../template/auth/ForgotPasswordTemplate";

export default function VerifyEmail(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    return(
        <ForgotPasswordTemplate
            screen={ScreensForgotPassword.Code}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordStrength={passwordStrength}
            setPasswordStrength={setPasswordStrength}
        />
    )
}