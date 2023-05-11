import { ConfirmButton } from "../drop_ins/confirm_button"
import { FormGroup } from "../drop_ins/form_group"

const DeleteUser = () => { 
    const lu = localStorage.getItem("user")
    if(!lu ) return ""
    const { username } = JSON.parse(lu) 

    return `
        <form id="deleteUserForm">
            <h2>WARNING: IRREVERSIBLE!</h2>
            <p> Deleting your account is permanent. Please confirm the deletion of your account by typing your username 
                <span id="insertConfirmationString">${username}</span> in the space below.</p>
            </p>
            ${FormGroup({
                type: "text",
                label: "Confirm",
                placeholder: `${username}`,
                inputId: "confirmInput",
            })}
            ${ConfirmButton(true,"confirmDelete","Delete Account", "🗑️", false)}
        
        
        </form>
    
    `
}


export default DeleteUser