import state from "../lib/state"
import { ConfirmButton } from "./drop_ins/confirm_button"
import { FormGroup } from "./drop_ins/form_group"

const Register = () => { 
    if(state.get("loggedIn") === true){
        window.history.pushState({},window.location.pathname,window.location.href)
        window.location.hash =""
    }
    return `
        <form id="register_form">
            <h1>Sign Up</h1>
            ${FormGroup({
                label: "Username",
                inputId: "username",
                type: "text"
            })}
            ${FormGroup({
                label: "Email",
                inputId: "email",
                type: "email"
            })}
            ${FormGroup({
                label: "password",
                inputId: "password",
                type: "password"
            })}
           ${ConfirmButton(true,"registerSubmit","Create an Account","🧩",false)} 
            <br/>
            <span>Already have an account? Login <a href="/#forgot"> here</a> </span>
        </form>
    
    
    `
}

export default Register