import { addDoc, collection } from "firebase/firestore";
import { toaster } from "../lib/Toaster";
import { IListener } from "../lib/render";
import UseModal from "../templates/drop_ins/use_modal";
import CreateReflection from "../templates/modals/CreateReflections";
import { auth, db } from "../lib/firebase-client";


const DashboardListeners:IListener[] = [
    {
        type: "click",
        target: "#openReflectionModal",
        mode: "unique",
        handler(e){
            UseModal({
                content: CreateReflection(),
                listeners:[{
                    target: "#createReflectionForm",
                    type: "submit",
                    mode: 'unique',
                    async handler(e){
                        e.preventDefault()
                        const reflection:HTMLInputElement = document.querySelector("#reflectionText")!
                        const mood:HTMLInputElement = document.querySelector("#moodChoice")!

                        if(!mood || !mood.value || mood.value == "-1"){
                            toaster.add("error","Please fill out the required inputs before submitting this form")
                            return
                        }

                        const now = new Date()
                        try {     
                            await addDoc(
                                collection(db,"reflections"),{
                                    _author: auth.currentUser!.uid,
                                    dateString: `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`,
                                    time: `${now.getHours() % 12}:${`${now.getMinutes()}`.padStart(2,"0")} ${now.getHours() > 12 ? "PM" :"AM"}`,
                                    mood: mood.value,
                                    content: reflection.value || ""
                                }
                            )
                            toaster.add("success","Created new reflection successfully!")
                            window.location.reload()
                            } catch (error) {
                             toaster.add("error",`Failed to upload due to: ${error}`);
                                
                            }
                                


                    }
                }]
            })
        }
    }
]

export default DashboardListeners