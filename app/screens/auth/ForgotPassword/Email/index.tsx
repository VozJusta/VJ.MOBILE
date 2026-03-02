import { ScreensForgotPassword } from "../../../../../interfaces/interfaces";
import { ForgotPasswordTemplate } from "../../../../../template/auth/ForgotPasswordTemplate";

export default function ForgotPasswordEmail() {
    return(
        <ForgotPasswordTemplate screen={ScreensForgotPassword.Email}/>
    )
}