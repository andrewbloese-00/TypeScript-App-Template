
import { signOut } from "firebase/auth";
import { toaster } from "../lib/Toaster";
import { IListener } from "../lib/render";
import { auth } from "../lib/firebase-client";


const LandingListeners:IListener[] = [
{
    type: "click",
    target: "#logoutBtn",
    mode: "unique",
    handler: async (e)=>{
        try {
            await signOut(auth)
            toaster.add("success","Logged out successfully!")
            
        } catch (error) {
            toaster.add("error","Failed to log out because " + error)
        }
    }
}
] 

export default LandingListeners