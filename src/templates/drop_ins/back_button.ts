
type BackButtonSize = "small" | "medium" | "large"
export function BackButton(id:string, size: BackButtonSize){

    const map = { 
        small: [50, "1rem", "10px"],
        medium: [100, "1.4rem", "20px"],
        large: [ 150, "2rem", "30px"],
    }


    const [sizePx, fontSize, pad ] = map[size]
    const iconStyle = `width: ${sizePx}px; height: ${sizePx}px; display: flex; align-items: center; justify-content: center; border-radius: 100%; padding: ${pad};font-size: ${fontSize}`

    return `
        <button class="back_button" id="${id}" style="${iconStyle}">
            ⬅️
        </button>
    
    `
}