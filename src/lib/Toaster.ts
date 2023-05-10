
type ToastType = "error" | "success" | "loading" | "info"




class Toaster { 
    root: HTMLElement
    constructor(toasterRootId:string){
        this.root = document.getElementById(toasterRootId)!
        this.root.style.position = "fixed";
        this.root.style.top = "10%";
        this.root.style.left= "0";
        this.root.style.width = "100vw"
        this.root.style.display = "flex"
        this.root.style.flexDirection = "column"
        this.root.style.justifyContent = "center"
        this.root.style.alignItems= "center"
        this.root.style.gap = "20px"
        
        if(!this.root) throw new Error("Toaster failed to initialize")
    }
    add(type:ToastType,message:string){
        const toastElement = document.createElement("div")
        const iconPartial = document.createElement('span')
        const messagePartial = document.createElement('p')
        

        iconPartial.style.fontSize = "x-large";
        iconPartial.style.width = "60px";
        iconPartial.style.height = "60px";
        iconPartial.style.borderRadius= "100%";
        iconPartial.style.display = "flex";
        iconPartial.style.alignItems = "center";
        iconPartial.style.justifyContent = "center";
        

        toastElement.style.transition = "all 0.5s ease"; 
        toastElement.style.padding ="10px"
        messagePartial.style.padding ="10px"
        messagePartial.style.color = "white"
        messagePartial.textContent = message
        switch(type){
            case "error": {
                toastElement.style.backgroundColor = "rgba(255, 68, 61,0.6)"
                toastElement.style.border = "1px solid red"
                iconPartial.textContent = "❌"
                break;
            }
            case "success": {
                toastElement.style.backgroundColor = "rgba(66, 245, 120,0.6)"
                toastElement.style.border = "rgb(66, 245, 120)"
                iconPartial.textContent = "✅"
                break;
            }
            case "info": {
                toastElement.style.backgroundColor = "rgba(255, 210, 61, 0.6)"
                messagePartial.style.color = "#171717"
                toastElement.style.borderColor = "rgb(255, 210, 61)"
                iconPartial.textContent = "💡"
                break
            }
        }
        
        toastElement.appendChild(iconPartial)
        toastElement.appendChild(messagePartial)
        
        toastElement.style.transform = "translateY(-100vw)"
        this.root.appendChild(toastElement)
        
        setTimeout(()=>{
            toastElement.style.transform = "translateY(0)"
            
            
            toastElement.style.display = "grid"
            toastElement.style.gridTemplateColumns = "60px 1fr"
            toastElement.style.placeItems= "center"
            
            //hover effect
            toastElement.addEventListener("mouseover",(e)=>{
                toastElement.style.borderRadius = "20px"
                toastElement.style.transform = "scale(1.2)"
                toastElement.style.boxShadow = "2px 3px 5px rgba(0, 0 , 0.4)"
            })
            toastElement.addEventListener("mouseout",(e)=>{
                toastElement.style.borderRadius = "0px"
                toastElement.style.transform = "scale(1)"
                toastElement.style.boxShadow = "none"
            })
            //end hover effect
            
    
            //click to dismiss
            toastElement.addEventListener("click",(e)=>{
                //move offscreen
                toastElement.style.transform = "translateY(-100vh)"
                toastElement.style.filter = "blur(10px)"
                toastElement.style.opacity = "0.1";
                
                //transition timeout
                setTimeout(()=>{
                    toastElement.remove()
                },500)
            })

            setTimeout(()=>{
                  //move offscreen
                  toastElement.style.transform = "translateY(-100vh)"
                  toastElement.style.filter = "blur(10px)"
                  toastElement.style.opacity = "0.1";
                  
                  //transition timeout
                  setTimeout(()=>{
                      toastElement.remove()
                  },500)
            }, 6000)

        },10)

        

    }

}





export const toaster = new Toaster("notification_center")
export default Toaster 