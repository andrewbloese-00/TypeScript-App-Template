import { IListener } from "../../lib/render"

interface UseModalParams { 
    content:string,
    listeners:IListener[],

}

const UseModal = (params:UseModalParams) => { 

    const modal_container:HTMLElement = document.querySelector("#modalContainer")!
    const insert:HTMLElement = document.querySelector("#modalInjectionSite")!
    insert.innerHTML = params.content
    modal_container.style.opacity = "1";
    modal_container.style.transform = "translateX(0)"
    for(const listener of params.listeners) {
        const { mode , target, handler, type } = listener
        switch(mode){
            case "unique": {
                const el = document.querySelector(target)
                el?.addEventListener(type,handler)
                break;
            } 
            case "multi":{
                const els = document.querySelectorAll(target)
                els.forEach(el => {
                    el.addEventListener(type,handler)
                })
                break;
            }
            default: break;
        }
    }
    window.scrollTo(0,0)

    const backdrop = document.querySelector("#modalBackdrop")!
    console.log('bg',backdrop)
    backdrop!.addEventListener("click",(e)=>{
        modal_container.style.transform = "translateX(100vw)"
        modal_container.style.opacity = "0"
        for(let lis of params.listeners){
            const { mode , target, handler, type } = lis
                switch(mode){
                    case "unique": {
                        const el = document.querySelector(target)
                        el?.removeEventListener(type,handler)
                        break;
                    } 
                    case "multi":{
                        const els = document.querySelectorAll(target)
                        els.forEach(el => {
                            el.removeEventListener(type,handler)
                        })
                        break;
                    }
                    default: break;
                }
        }
    })
}

export default UseModal