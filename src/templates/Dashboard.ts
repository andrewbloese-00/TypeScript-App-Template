import { toaster } from "../lib/Toaster"
import state from "../lib/state"
import { db } from "../lib/firebase-client"
import ListItemInteractive from "./drop_ins/list_item_interactive"




const Dashboard = () => { 

    let reflections = [{id:1,dateString: "Wed, May 10, 2023 @ 12:33pm", score: "😃", }]
    let list = reflections.map(reflection=>ListItemInteractive({
        id:`reflectionCard_${reflection.id}`,
        title: reflection.dateString,
        main_content: `
            <div class="reflection-list-content">
                <p>You felt ${reflection.score}</p>
            </div>
        `,
        controls: [
            {
                controlType:"view",
                controlId: `viewControl_${reflection.id}`,
            },
            {
                controlType: "delete",
                controlId: `deleteControl_${reflection.id}`
            },
        ]
    })).join("\n")

    console.log(list)






    return `
        <div class="dashboard-view">
            <section class="mood_graph" id="moodGraphContainer">

            </section>
            <section class="reflections_toolbar">

            
            </section>
            <section class="reflections_list">
                ${list}
            </section>



        </div>
    
    `




}


export const DashboardInit = async () => { 
    const currentUser = state.get("userData");
    if (!currentUser) return;
    
}

export default Dashboard