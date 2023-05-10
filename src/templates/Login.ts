import { toaster } from "../lib/Toaster"
import state from "../lib/state"
import { ConfirmButton } from "./drop_ins/confirm_button"
import { FormGroup } from "./drop_ins/form_group"

const Login = () => { 
  
    return `
        <form id="login_form">
        <form id="loginForm">
        <h1>LOGIN</h1>
        ${FormGroup({
            inputId: "email",
            label: "Email",
            type: "email"
        })}
        ${FormGroup({
            inputId: "pw",
            label: "Password",
            type: "password"
        })}
            <span> Forgot Your Password? Reset it <a data-link href="#forgot"> here </a> </span>
        
            ${ConfirmButton(true, "login_submit","Login","🔐",false)}

        </form>


        </form>
    
    
    `
}

export const LoginInit = () =>{ 
    if(state.get("loggedIn") === true){
        toaster.add("info","Already logged in. Redirected to home page.")
        window.location.hash ="#"
    }
}

export default Login