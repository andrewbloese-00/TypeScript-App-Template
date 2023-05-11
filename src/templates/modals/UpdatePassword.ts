import { ConfirmButton } from "../drop_ins/confirm_button"
import { FormGroup } from "../drop_ins/form_group"

const UpdatePassword = () => { 
    return `
        <form id="updatePasswordForm">
            ${FormGroup({
                type: "password",
                label: "New Password",
                placeholder: "some@example.com",
                inputId: "passwordInput",
            })}
            ${FormGroup({
                type: "password",
                label: "Confirm New Password",
                placeholder: "Confirm your new password",
                inputId: "passwordConfirm",
            })}
            ${ConfirmButton(true,"confirmChangePassword","Update Password", "🔒", false)}
        
        
        </form>
    
    `
}


export default UpdatePassword