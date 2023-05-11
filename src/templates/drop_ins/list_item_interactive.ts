
type ValidListItemControl = "add" | "view" | "delete" | "edit"




interface ListItemInteractiveControl { 
    controlType:ValidListItemControl,
    controlId: string
}

interface ListItemInteractiveParams{
    title:string,
    muted_subtitle?:string,
    main_content:string,
    id:string,
    controls:ListItemInteractiveControl[]
    background?: string,
    color?:string
}

export function ListItemInteractive(params:ListItemInteractiveParams){
    let controls = params.controls.map(control=>{
        return `
            <button 
                type="button" 
                class="list-item-control-btn" 
                id="${control.controlId}">
                ${control.controlType === "add" 
                    ? `+` 
                    : control.controlType === "view"
                        ? `View`
                        : control.controlType === "delete" 
                            ?`🗑️`
                            : control.controlType === "edit" 
                                ? `✏️`
                                : ""
                }

            </button>
        `
    })


    return `<div class="list-item-interactive" id="${params.id}"
    ${!!params.background || !!params.color} style="${params.background ? `background-color: ${params.background};` : ""} ${params.color ? `color: ${params.color};` : ""}"
            >
        <h3 class="list-item-interactive-title">
            ${params.title}
        </h3>
        ${params.muted_subtitle 
            ? `<h4 class="list-item-interactive-muted-sub">${params.muted_subtitle}</h4>` 
            : ''
        }
        ${params.main_content}

        <section class="list-item-interactive-controls">
        ${controls.join("\n")}
        
        </section>

    
    
    
    </div>`
}

export default ListItemInteractive