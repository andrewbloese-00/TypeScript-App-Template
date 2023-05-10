import { ConfirmButton } from "./drop_ins/confirm_button"
import { FormGroup } from "./drop_ins/form_group"

const Forgot = () => { 
    return `
        <form id="forgotForm">

            <h2>Forgot Password</h2>
            <p>Please enter your email address that you used to sign up. We will send you an email with details on how to reset your password! </p>
            ${FormGroup({
                inputId: "email",
                type: "email",
                label: "Email"
            })}

            ${ConfirmButton(true,"submitForgotPW","Get Reset Email", "📩",false)}
        
        </form>
    
    
    `
}

export default Forgot