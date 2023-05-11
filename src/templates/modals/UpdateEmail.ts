import { ConfirmButton } from "../drop_ins/confirm_button"
import { FormGroup } from "../drop_ins/form_group"

const UpdateEmail = () => { 
    return `
        <form id="updateEmailForm">
            ${FormGroup({
                type: "email",
                label: "New Email",
                placeholder: "some@example.com",
                inputId: "emailInput",
            })}
            ${ConfirmButton(true,"confirmChangeEmail","Update Email", "📩", false)}
        
        
        </form>
    
    `
}


export default UpdateEmail