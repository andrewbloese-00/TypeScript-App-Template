import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../lib/firebase-client"
import { updateProfile} from "firebase/auth"
import { ConfirmButton } from "./drop_ins/confirm_button"
import DragAndDropUploader, { applyUploaderListeners } from "./drop_ins/file_uploader"
import FileUploader from "./drop_ins/file_uploader"
import state from "../lib/state"


const Account = () => { 
    return `<div class="account_view">
        <h1> Account Details </h1>
        <div id="pfpInject">
        </div>
        <h3 class="edit-grid-title">Username</h4>
        <div class='edit-grid'>
            <h3 class="account-view-username" id="usernameText"></h3>
            ${ConfirmButton(false,"openEditUsername","Edit", "✏️",false)}
        </div>
            
        <h3 class="edit-grid-title">Email</h4>
        <div class='edit-grid'>
        <h3 class="account-view-username" id="emailText"></h3>
        ${ConfirmButton(false,"openEditEmail","Edit", "✏️", false)}
        </div>
        

        <h1>Security</h2>

        <div class='edit-grid'>
            <h3 class="account-view-username">Password</h3>
            ${ConfirmButton(false,"openEditPassword","Update Password", "🔐", false)}
        </div>
        <br/>   
        <div class='edit-grid'>
        <h3 class="account-view-username">Delete Account</h3>
        ${ConfirmButton(false,"openDeleteUser","Delete Account", "🗑️", false)}
        </div>

            

    </div>
    `
}

export const AccountInit = async () => { 
    const localUser:LocalUser = JSON.parse(localStorage.getItem("user")!)


    if(!localUser){
        console.error("Failed to initialize account. No user found.")
        return
    }

    const userDoc = await getDoc(
        doc(db,"users",localUser.uid)
    )
    const userdata = userDoc.data()!

    const 
    emailSection:HTMLHeadingElement = document.querySelector("#emailText")!, 
    usernameSection:HTMLHeadingElement = document.querySelector("#usernameText")!, 
    profilePicContainer:HTMLDivElement = document.querySelector("#pfpInject")!
    
    function initForm(){
        const params = {
            inputID: "profileUploaderInput",
            formID: "profileUploaderForm",
            multi: false,
            prompt: "Choose A Profile Image",
            async submitHandler(){
                const uploadResult = state.get("uploadResults")
                if(uploadResult.error){
                    console.log("No such result")
                    return
                }
                const toUpdate = doc(db,"users",userDoc.id)
                await updateDoc(toUpdate,{
                    pfpURL: uploadResult[0] || "ERROR"
                })
                await updateProfile(auth.currentUser!,{
                    photoURL: uploadResult[0] || "ERROR"
                })

            }
        }
        const markup = FileUploader(params)
        console.log(markup)
        profilePicContainer.innerHTML = markup
        applyUploaderListeners(params)
    }
    if(!userdata.pfpURL){
        initForm()
    } else {
        function hoverEnter(e){
            profilePicContainer.style.border = "2px solid royalblue"
            msgSpan.textContent = "Click to upload a new photo"
            profilePicContainer.appendChild(msgSpan)
        }
        function hoverLeave(e){
            profilePicContainer.style.border = "2px solid transparent"
            profilePicContainer.removeChild(msgSpan)
        }
        const msgSpan = document.createElement("span")
        profilePicContainer.addEventListener("mouseenter",hoverEnter)
        profilePicContainer.addEventListener("mouseleave",hoverLeave)
        profilePicContainer.addEventListener("click",()=>{
            initForm()
            profilePicContainer.removeEventListener("mouseenter",hoverEnter)
            profilePicContainer.removeEventListener("mouseleave",hoverLeave)
            profilePicContainer.style.border = "none"
        })
    }
    profilePicContainer!.style.width = "100%"
    profilePicContainer!.style.aspectRatio= "1/1"
    
    if(auth.currentUser?.photoURL != null){
        const img = document.createElement("img")
        img.src = auth.currentUser!.photoURL
        profilePicContainer.innerHTML =  ``
        profilePicContainer.appendChild(img)
    }
    emailSection.textContent = userdata.email
    usernameSection.textContent = userdata.username
}



interface LocalUser { 
    username: string;
    email: string;
    uid: string
}


export default Account