import { sendPasswordResetEmail } from "firebase/auth"
import { toaster } from "../lib/Toaster"
import { IListener } from "../lib/render"
import { auth } from "../lib/firebase-client"

const ForgotListeners:IListener[] = [
    {
        type: "submit",
        target: "#forgotForm",
        mode: "unique",
        handler: async e => { 
            e.preventDefault()
            const email:HTMLInputElement = document.querySelector("#email")!
            if(!email || !(email.value)){
                toaster.add("error","Please enter a valid email address before submitting this form.")
                return                
            }
            try {
                await sendPasswordResetEmail(auth,email.value)
                toaster.add("success",`Sent an email containing details to reset your password sent to ${email.value}`)
                
            } catch (error) {
                toaster.add("error",`Failed to send password reset email: ${error}`)
                
            }


        }
    }
]

export default ForgotListeners