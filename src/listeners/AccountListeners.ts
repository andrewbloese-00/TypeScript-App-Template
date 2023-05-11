import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toaster } from "../lib/Toaster";
import { IListener } from "../lib/render";
import UseModal from "../templates/drop_ins/use_modal";
import { auth, db } from "../lib/firebase-client";
import { deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import UpdateEmail from "../templates/modals/UpdateEmail";
import UpdateUsername from "../templates/modals/UpdateUsername";
import UpdatePassword from "../templates/modals/UpdatePassword";
import DeleteUser from "../templates/modals/DeleteUser";

const AccountListeners:IListener[] = [
    {
        type: "click",
        mode: "unique",
        target: "#openEditUsername",
        async handler(e) {
            UseModal({
                content: UpdateUsername(),
                listeners: [{
                    type: "submit",
                    target: "#updateUsernameForm",
                    mode: "unique",
                    async handler(e){
                        e.preventDefault()
                        const localUser = JSON.parse(localStorage.getItem("user")!)
                        if(!localUser) {
                            toaster.add("error","Must be logged in to update email address")
                            return
                        }
                        const inputElement:HTMLInputElement = document.querySelector("#usernameInput")!
                        if(!inputElement.value){
                            toaster.add("error","Could not update your email. Please make sure to enter a new valid email address in the provided input.")
                            return
                        }
                        const userDoc = doc(db,"users",localUser.uid)
                        try {
                            await updateDoc(userDoc,{username: inputElement.value})
                            await updateProfile(auth.currentUser!,{displayName: inputElement.value  })
                            toaster.add("success", `Username updated successfully to ${inputElement.value}`)
                            setTimeout(()=>{
                                window.location.reload()
                            }, 5000)
                        } catch (error) {
                            toaster.add("error",`Could not update your username due to: ${error}`)
                            inputElement.style.borderBottom = '1px solid red'
                            setTimeout(()=>{
                                inputElement.style.borderBottom = '1px solid transparent'
                            })
                            return 
                        }
                    }
                }]
            })
        }
    },
    { //handle edit emails modal
        type: "click",
        mode: "unique",
        target: "#openEditEmail",
        async handler(e) {
            UseModal({
                content: UpdateEmail(),
                listeners: [{
                    type: "submit",
                    target: "#updateEmailForm",
                    mode: "unique",
                    async handler(e){ //handle 
                        e.preventDefault()
                        const localUser = JSON.parse(localStorage.getItem("user")!)
                        if(!localUser) {
                            toaster.add("error","Must be logged in to update email address")
                            return
                        }
                        const inputElement:HTMLInputElement = document.querySelector("#emailInput")!
                        if(!inputElement.value){
                            toaster.add("error","Could not update your email. Please make sure to enter a new valid email address in the provided input.")
                            return
                        }
                        const userDoc = doc(db,"users",localUser.uid)
                        try {
                            await updateDoc(userDoc,{email: inputElement.value})
                            await updateEmail(auth.currentUser!,inputElement.value)
                            toaster.add("success", `Email updated successfully to ${inputElement.value}`)
                            
                            const d = await getDoc(userDoc)
                            const  userFetched  = d.data()!
                            updateStoredUser({
                                username: userFetched.username,
                                uid: d.id,
                                email: userFetched.email
                            })


                        } catch (error) {
                            toaster.add("error",`Could not update your email due to: ${error}`)
                            inputElement.style.borderBottom = '1px solid red'
                            setTimeout(()=>{
                                inputElement.style.borderBottom = '1px solid transparent'
                            })
                            return 
                        }
                        
                    }
                }]
            })
        },
    },
    { //handle open edit password
        type: "click",
        mode: "unique",
        target: "#openEditPassword",
        async handler(e){
            UseModal({
                content: UpdatePassword(),
                listeners: [{
                    type: "submit",
                    target: "#updatePasswordForm",
                    mode: "unique",
                    async handler(e){ //handle password reset submit
                        e.preventDefault()
                        const [pw,confirm]:(HTMLInputElement|null)[] = [
                            document.querySelector("#passwordInput"),
                            document.querySelector("#passwordConfirm"),

                        ]
                        if(!pw || !confirm || !pw.value || !confirm.value){
                            toaster.add("error","Please fill all required fields to update your password.")
                            return
                        }

                        if(pw.value != confirm.value) {
                            toaster.add("error","Passwords do not match! Please make sure that both password and confirm password are the same!")
                        }
                        
                        try {
                            await updatePassword(auth.currentUser!,pw.value)
                            toaster.add("success","Password updated successfully!")
                            window.location.reload()

                        } catch (err) { //if user is not logged in
                            toaster.add("error",`Could not update password because: ${err}`)
                            return
                        }
                    }
                }]
            })
        }
    },
    { //handle delete user
        type: "click",
        mode: "unique",
        target: "#openDeleteUser",
        async handler(e){
            UseModal({
                content: DeleteUser(),
                listeners: [{
                    type: "submit",
                    target: "#deleteUserForm",
                    mode: "unique",
                    async handler(e){ //handle password reset submit
                        e.preventDefault()
                        const username = auth.currentUser!.displayName
                        if(!username) return
                        const confirmInput:HTMLInputElement = document.querySelector("#confirmInput")!                        
                        if(!confirmInput || !confirmInput.value || confirmInput.value !== username){
                            toaster.add("error","Failed to delete user. Enter the confirmation and try again.")
                        }


                        try {
                            await deleteUser(auth.currentUser!)
                            toaster.add("success","Account deleted successfully")
                        } catch (error) {
                            toaster.add("error",`Could not delete user due to: ${error}`)
                        }



                    }
                }]
            })
        }
    },
    

]




interface IStoredUser { 
    uid: string, 
    email: string, 
    username: string,   
}
function updateStoredUser( updatedUser:IStoredUser ){
    localStorage.setItem("user",JSON.stringify(updatedUser));
}
export default AccountListeners