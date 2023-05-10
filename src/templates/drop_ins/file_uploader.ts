import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase-client";
import { IListener } from "../../lib/render";
import { toaster } from "../../lib/Toaster";


function safeName(filename:string){ 
    const [ name, ext ] = filename.split(".")
    return `${name.split(" ").join("_")}.${ext}`
}


interface DragAndDropUploaderParams { 
    areaID:string, 
    formID:string,
    inputID:string
}

export const applyListeners = ( params: DragAndDropUploaderParams) => { 
    const fileInput:HTMLInputElement|null = document.querySelector("#"+params.inputID)
    const dropArea = document.querySelector(params.areaID)
    if(!dropArea || dropArea === null) {
        console.error("Failed to find drop area")
        return
    }
    function preventDefaults (e:Event) {
      e.preventDefault()
      e.stopPropagation()
    }
    ['dragenter', 'dragover', 'dragleave', 'drop']
        .forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        })

    function highlight(e:Event) {
        dropArea!.classList.add('highlight')
    }
        
    function unhighlight(e:Event) {
        dropArea!.classList.remove('highlight')
    }
    ['dragenter', 'dragover'].forEach(eventName => {
         dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });

    dropArea.addEventListener('drop', (e)=>handleDrop, false)


    async function handleFiles(files:FileList){
        let F = [...files]
        let jobs = []
        for(let i = 0; i< F.length ; i++ ){
            let name = safeName(F[i].name)
            const storageRef = ref(storage,`uploads/${name}`)
            jobs.push(uploadBytes(storageRef,F[i]))
        }
        const uploadResults = await Promise.all(jobs)
        let gets = []
        for(let j = 0; j < uploadResults.length; j++){
            gets.push(getDownloadURL(
                uploadResults[j].ref
            ))
        }

        return Promise.all(gets)
    }


    function handleDrop(e:DragEvent) {
        let dt = e.dataTransfer!
        fileInput!.files = dt.files
    }

    const form = document.querySelector("#"+params.formID)!
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        if(!fileInput?.files){
            toaster.add("error","Failed to upload images")
            return 
        } else { 
            handleFiles(fileInput.files)
        }
    })
        



        
      



}


const DragAndDropUploader = (params:DragAndDropUploaderParams) => {
    const {areaID, formID, inputID} = params
    return `
    <div id="${areaID}" class="drop-region">
    <form class="drag_uploader_form" id="${formID}">
        <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
        <input type="file" id="${inputID}" multiple accept="image/*" onchange="handleFiles(this.files)">
        <label class="button" for="fileElem">Select some files</label>
    </form>
    </div>

    
    `
}