
interface FloatingButtonParams { 
    text?: string
    icon: string,
    id: string,
    top?:string
    left?:string,
    right?:string,
    bottom?:string
}


const FloatingButton = (params:FloatingButtonParams) => { 
    return `
        <button class="floating-button" id="${params.id}">
            <span class="floating-button-icon">${params.icon}</span>
            ${params.text
                ? `<span class="floating-button-text">${params.text}</span>` 
                : ``
            }
        </button>
    
    `
}

export default FloatingButton