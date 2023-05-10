

import { ConfirmButton } from "./drop_ins/confirm_button"




const Landing = ( ) => { 
    return `
    <div class="landing-layout">
        <section id="hero">
            <div class="landing-content-left">

            </div>
            <div class="landing-content-center">
            </div>

            <div class="landing-content-right">

                <h2 class="landing-right-title">Insert brand tagline</h2>
                <p class="landing-right-type">
                Esse ipsum sint magna commodo quis sint nostrud incididunt eiusmod veniam exercitation. Labore deserunt eiusmod duis eu aliquip duis nisi veniam reprehenderit fugiat. Veniam id aliquip et consequat ullamco enim et in minim minim.
                </p>

                ${ConfirmButton(false,"cta_button","CALL TO ACTION", "🚀", false)}
            </div>
        </section>

 


 
        <section class="landing-section">
            <h2> Some Feature </h2>
            <p>Dolore sunt exercitation magna eiusmod. Sit ipsum quis anim duis quis esse mollit aute incididunt id. Reprehenderit incididunt officia magna est non non ex. Anim nisi do ex culpa.
            
            <a href="#">Some Link</a>
            </p>
            <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
            
        </section>
        <section class="landing-section">
            <h2> Some Feature</h2>
            <p>Dolore sunt exercitation magna eiusmod. Sit ipsum quis anim duis quis esse mollit aute incididunt id. Reprehenderit incididunt officia magna est non non ex. Anim nisi do ex culpa.
            <a href="#">Some Link</a>
            
            </p>
            <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
            
        </section>
        <section class="landing-section">
            <h2> Some Feature </h2>
            <p>Dolore sunt exercitation magna eiusmod. Sit ipsum quis anim duis quis esse mollit aute incididunt id. Reprehenderit incididunt officia magna est non non ex. Anim nisi do ex culpa.
            <a href="#">Some Link</a>
            
            </p>
            <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
            
        </section>

        
        <section class="landing-section">
            <h2> Some Feature </h2>
            <p>Dolore sunt exercitation magna eiusmod. Sit ipsum quis anim duis quis esse mollit aute incididunt id. Reprehenderit incididunt officia magna est non non ex. Anim nisi do ex culpa.
             <a href="#">Some Link</a>
            </p>
            <img src=   "https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
            
        </section>

    </div>
    `
}


export const LandingInit =  () => { 

}
export default Landing 