type GroupType = "text" | "email"| "area" | "range" | "select" | "number" | "password"
interface GroupOption  {
    value: string,
    displayContent:string
}
interface FormGroupParams {type:GroupType, inputId:string, label: string, options?:GroupOption[], placeholder?:string}
export const FormGroup = ( params:FormGroupParams ) => { 
    const  { type, inputId, label } = params;


    let input = ""
    if(type == "text" || type=="email" || type=="password" || type=="number"){
        input = `<input 
            type="${type}"
            id="${inputId}"
            name="${inputId}" 
            ${params.placeholder? `placeholder="${ params.placeholder}"` : ""}
            />`
            
        }
        if(type == "area") {
            input = `<textarea
            ${params.placeholder? `placeholder="${ params.placeholder}"` : ""}
            id="${inputId}"
            name=${inputId}
        ></textarea>`
    }
    if(type == "select" && params.options?.length) {
        let children = [`<option value="-1"disabled>Choose A Mood</option>`]
        for(let option of params.options){
            children.push(
                `<option ${option.value === "3" ? "selected" :""} value="${option.value}">
                    ${option.displayContent}
                </option>`
            )
        }

        input = `<select id="${inputId}">
            ${children.join("\n")}
        </select>`
    }

    return `
        <div class="form-group">
            <label for="${inputId}">${label}</label>
            ${input || "err"}
        </div> 
    
    `
}