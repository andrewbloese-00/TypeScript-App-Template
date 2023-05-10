import { IListener } from "../lib/render";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../lib/firebase-client'
import { toaster } from "../lib/Toaster";
const LoginListeners:IListener[] = [
    {
        target: "#login_form",
        mode: "unique",
        type:"submit",
        handler: async e => {
          e.preventDefault()
          console.time("loginHandler")
          let email:HTMLInputElement = document.querySelector("#email")!
          let password:HTMLInputElement = document.querySelector("#pw")!
          try {
              await signInWithEmailAndPassword(auth,email.value, password.value)
              toaster.add("success", "Logged in successfully!")
              
            } catch (e){
                console.error(e)
                toaster.add("error","Failed to Login: Invalid Credentials")
            } finally{
                console.timeEnd("loginHandler")

            }
        }
      }
]

export default LoginListeners