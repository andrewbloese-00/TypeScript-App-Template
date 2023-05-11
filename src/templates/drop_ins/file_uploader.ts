import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase-client";
import { toaster } from "../../lib/Toaster";
import { ConfirmButton } from "./confirm_button";
import state from "../../lib/state";


function safeName(filename:string){ 
    const [ name, ext ] = filename.split(".")
    return `${name.split(" ").join("_")}.${ext}`
}


interface UploaderParams { 
    formID:string,
    inputID:string,
    multi:boolean,
    prompt?:string,
    secure?:boolean,
    submitHandler:(()=>Promise<void>)


}


function curry(fn:Function){
    return function h(_author:string){
        return function g(files:FileList){
            return fn(_author,files)
        }
    }
}




export const applyUploaderListeners = ( params: UploaderParams) => { 
    const fileInput:HTMLInputElement|null = document.querySelector("#"+params.inputID)
    async function handleFiles(_author:string="public", files:FileList){
        const submitButton:HTMLButtonElement = document.querySelector("button[type='submit']")!
        let F = [...files]
        let jobs = []
        submitButton.disabled = true
        for(let i = 0; i< F.length ; i++ ){
            let name = safeName(F[i].name)
            const storageRef = ref(storage,`uploads/${_author}/${name}`)
            jobs.push(uploadBytes(storageRef,F[i]))
        }
        const uploadResults = await Promise.all(jobs)
        let gets = []
        for(let j = 0; j < uploadResults.length; j++){
            gets.push(getDownloadURL(
                uploadResults[j].ref
                ))
            }
            
        const results = await Promise.all(gets)
        console.log('uploads',results)
        state.set("uploadResults",results)
        submitButton.disabled = false
    }
    let handler = curry(handleFiles)("public")
    if(params.secure === true){
        const currentUser = JSON.parse(localStorage.getItem("user")!)
        if(!currentUser) {
            toaster.add("error","Must be logged in to upload files.")
            return 
        }
        handler = curry(handleFiles)(currentUser.uid)
    }


    const form = document.querySelector("#"+params.formID)!
    fileInput!.addEventListener("change",(e)=>{
        if(!fileInput?.files){
            toaster.add("error","Failed to upload images")
            return 
        } else { 
            handler(fileInput.files)
        }
    })
    form.addEventListener("submit",async (e)=>{
        e.preventDefault()
        await params.submitHandler()
    })
}


const FileUploader = (params:UploaderParams) => {
    const { formID, inputID, multi} = params
    return `

    <form class="drag_uploader_form" id="${formID}">
        <h2>${params.prompt || "Use the choose file button to pick your file(s)"}</h2>
        <input type="file" id="${inputID}" ${multi ? "multiple" : ""} accept="image/*">
        ${ConfirmButton(true,"submitFileUpload","Upload", "⬆️",false)}
    </form>


    
    `
}


export default FileUploader