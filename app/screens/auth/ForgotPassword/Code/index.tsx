import { ScreensForgotPassword } from "../../../../../interfaces/interfaces";
import { ForgotPasswordTemplate } from "../../../../../template/auth/ForgotPasswordTemplate";

export default function VerifyEmail(){
    return(
        <ForgotPasswordTemplate screen={ScreensForgotPassword.Code}/>
    )
}