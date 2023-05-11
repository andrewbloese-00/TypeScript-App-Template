import state from "./state"

type ListenerType = "click" | "DOMContentLoaded" | "submit" | "change" | "mouseenter" | "mouseleave" 
type ListenerMode = "unique" | "multi"
interface IRoute { 
    path: string | RegExp
    listeners: IListener[]
    template: ()=>string,
    init: ()=>void|(()=>Promise<void>)|(()=>any)|(()=>Promise<any>)

}
export interface IListener {   
    target: string
    mode: ListenerMode
    type: ListenerType,
    handler: (e:Event)=>void
}
export class BlazeRenderer { 
    _started:boolean = false;
    _root:Element;
    _routes:IRoute[]
    _currentRoute:IRoute | null;
    _hashChange:(e:HashChangeEvent)=>void|(Promise<void>)


    async _render(route:IRoute){
        console.time("render")
        this._cleanup();
        this._root.innerHTML = route.template()

        await route.init()
        
        for(let listener of route.listeners){
            const { type , mode , handler, target } = listener
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
                }
            }
            
        }
        this._currentRoute = route
        this._useCustomAnchors()
        console.timeEnd("render")
      
      
    }

    _findRoute(pathHash:string){
        let m:null|IRoute = null
        for(let r = 0; r < this._routes.length; r++){
            if(this._routes[r].path instanceof RegExp){
                if(pathHash.match(this._routes[r].path)){
                    m = this._routes[r];
                    break
                }
            } else if(this._routes[r].path == pathHash ){
                m = this._routes[r]
                break;
            }

        }
        return m;
    }
    _resetHashListener(){
        window.removeEventListener("hashchange",this._hashChange)
        window.addEventListener("hashchange", this._hashChange )
    }
    _cleanup(){
        if(this._currentRoute != null){
            this._currentRoute.listeners.forEach((listener)=>{
                const { mode , target, handler, type } = listener
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
            })

            //cleanup old anchors
            document.querySelectorAll("a")
            .forEach(a=>{
                if(a.hasAttribute("data-link")){
                    a.removeEventListener("click",e=>{
                        e.preventDefault()
                        window.location.hash = a.href
                    })
                }
            })
        }
    }
    _useCustomAnchors(){
        //apply custom anchor logic to the anchor tags with "data-link" attribute. 
        document.querySelectorAll("a")
        .forEach(a=>{
            if(a.hasAttribute("data-link")){
                a.addEventListener("click",e=>{
                    e.preventDefault()
                    window.location.hash = a.href.split("#")[1] || ""
                })
            }
        })

    }

    constructor(rootSelector:string){
        const r =  document.querySelector(rootSelector)
        if(r){
            this._root = r
        } else { 
            throw new Error("Invalid root selector: " + rootSelector + ".\nEnsure that the element is present on the page before initializing the render client.")
        }
        this._routes = []
        this._hashChange = (async e=>{
            const routeMatch = this._findRoute(window.location.hash.split("#").pop() || "")

            if(routeMatch){
                await this._render(routeMatch)
            }
            

        })
        window.addEventListener("hashchange",this._hashChange)
        this._currentRoute = null
        
    }
  


    /**
     * 
     * @param {string|RegExp} path - either a direct match or regular expression to match a path in the application 
     * @param {function():string} template - the synchronous funciton returning html template to render 
     * @param {IListener[]} listeners - an array of listeners to be applied after template loaded and initializer has finished
     * @param {function():void|(function():Promise<void>)} initializer the function to be called after render (think dynamic content injection)
     * @returns 
     */
    addRoute(path:string|RegExp, template:()=>string, listeners:IListener[],initializer=()=>{}){
        console.log('Adding Route: ', path)
        this._routes.push({
            path, template, listeners,init: initializer
        })
        this._resetHashListener()
        return this._routes.at(-1)
    }

 

    /**
     * @about Creates a new hash change event to trigger the initial render of the application
     */
    start(){
        if(!this._started){
            const startEvent = new HashChangeEvent("hashchange",{})
            this._hashChange(startEvent)
        }
    }



}


