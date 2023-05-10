export const ConfirmButton = (isSubmit:boolean, id:string,text:string="Confirm",icon:string|null,showOnHover:boolean=true) => {
    
    return `<button type="${isSubmit ? "submit" : "button"}" class="confirm_button" id="${id}">
        <span class="confirm_icon ${!icon?.length ? "norender" : ""}">${icon}</span>
        <span class="confirm_text ${showOnHover ? "hide" : ""}">${text}</span>
    
    </button> `
}