import { ScreensForgotPassword } from "../../../../../interfaces/interfaces";
import { ForgotPasswordTemplate } from "../../../../../template/auth/ForgotPasswordTemplate";

export default function UpdatePassword() {
    return(
        <ForgotPasswordTemplate
            screen={ScreensForgotPassword.Update}
        />
    )
}