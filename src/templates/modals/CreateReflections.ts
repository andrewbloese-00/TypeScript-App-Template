import { ConfirmButton } from "../drop_ins/confirm_button"
import { FormGroup } from "../drop_ins/form_group"


const CreateReflection = ()=>{
    return `
        <form id="createReflectionForm">
            ${FormGroup({
                type: "select",
                label: "Mood",
                inputId: "moodChoice",
                options:[
                    {value: "0", displayContent: "😭 Horrible"},
                    {value: "1", displayContent: "😕 Bad"},
                    {value: "2", displayContent: "😞 I've been worse"},
                    {value: "3", displayContent: "😐 Neutral"},
                    {value: "4", displayContent: "😌 Content"},
                    {value: "5", displayContent: "😃 Happy"},
                    {value: "6", displayContent: "🤩 Amazing"},
                ]
            })}
            ${FormGroup({
                type: "area",
                inputId: "reflectionText",
                label: "Reflect",
                placeholder: "Describe what made you feel that way"
            })}


            ${ConfirmButton(true,"submitReflection","Save Reflection", "🧠", false)}
        </form>
    
    `
}

export default CreateReflection