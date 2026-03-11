import React, { useState } from "react";
import { ScreensForgotPassword } from "../../../../../interfaces/interfaces";
import { ForgotPasswordTemplate } from "../../../../../template/auth/ForgotPasswordTemplate";

export default function ForgotPasswordEmail() {
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <ForgotPasswordTemplate
            screen={ScreensForgotPassword.Email}
            passwordStrength={passwordStrength}
            setPasswordStrength={setPasswordStrength}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
        />
    );
}