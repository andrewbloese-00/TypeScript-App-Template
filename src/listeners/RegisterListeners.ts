import { createUserWithEmailAndPassword } from "firebase/auth";
import { IListener } from "../lib/render";
import { auth, db } from "../lib/firebase-client";
import { doc, setDoc } from "firebase/firestore";
import { toaster } from "../lib/Toaster";

const RegisterListeners:IListener[] = [
    {
        target: "#register_form",
        mode: "unique",
        type:"submit",
        handler: async e => {
          e.preventDefault()


          let username:HTMLInputElement = document.querySelector("#username")!
          let email:HTMLInputElement = document.querySelector("#email")!
          let password:HTMLInputElement = document.querySelector("#password")!
          try {
              const {user} = await createUserWithEmailAndPassword(auth,email.value, password.value)
              const newDocId = user.uid
              const ref = doc(db,"users",newDocId);
              await setDoc(ref,{
                email: email.value,
                usernamse: username.value,
                joined: new Date().toUTCString()
              })
              console.log("Successfully inserted user document")
              toaster.add("success","Registration Success!")
            
          } catch (error) {
            console.error(error)
            toaster.add("error","Failed to register user")
          }


        }
      }
]

export default RegisterListeners;