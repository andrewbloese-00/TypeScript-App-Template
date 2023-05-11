import { ConfirmButton } from "../drop_ins/confirm_button"
import { FormGroup } from "../drop_ins/form_group"

const UpdateUsername = () => { 
    return `
        <form id="updateUsernameForm">
            ${FormGroup({
                type: "text",
                label: "New Username",
                placeholder: "John Smith",
                inputId: "usernameInput",
            })}
            ${ConfirmButton(true,"confirmChangeUsername","Update Username", "🪪", false)}
        
        
        </form>
    
    `
}


export default UpdateUsername