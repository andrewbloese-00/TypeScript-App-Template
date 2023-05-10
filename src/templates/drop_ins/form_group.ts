type GroupType = "text" | "email"| "area" | "range" | "select" | "number" | "password"
interface GroupOption  {
    value: string,
    displayContent:string
}
interface FormGroupParams {type:GroupType, inputId:string, label: string, options?:GroupOption[]}
export const FormGroup = ( params:FormGroupParams ) => { 
    const  { type, inputId, label } = params;


    let input = ""
    if(type == "text" || type=="email" || type=="password" || type=="number"){
        input = `<input 
            type="${type}"
            id="${inputId}"
            name="${inputId}" 
        />`

    }
    if(type == "area") {
        input = `<textarea
            id="${inputId}"
            name=${inputId}
        ></textarea>`
    }
    if(type == "select" && params.options?.length) {
        let children = []
        for(let option of params.options){
            children.push(
                `<option value="${option.value}">
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