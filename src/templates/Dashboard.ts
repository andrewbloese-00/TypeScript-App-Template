import { Chart, registerables } from 'chart.js';
import { toaster } from "../lib/Toaster"
import { auth, db } from "../lib/firebase-client"
import state from "../lib/state"
import ListItemInteractive from "./drop_ins/list_item_interactive"
import FloatingButton from './drop_ins/floating_button';
import { collection, getDocs, query, where } from 'firebase/firestore';


Chart.register(...registerables)
let reflections = [
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😕", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😭", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😀", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "🤩", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😕", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😭", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😕", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😀", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "😕", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    {id:1,dateString: "5.10.2023 ", time: "12:33pm", score: "🤩", content: "Anim sit ad sit exercitation elit laborum tempor excepteur id voluptate qui Lorem sunt adipisicing. Occaecat laborum elit sint minim laboris sunt qui minim nostrud non nostrud aliquip ea dolor. Deserunt do quis qui officia excepteur velit sit nostrud dolore ipsum quis id. " },
    
    
]

const MOOD_ENUM = ["😭","😞","😕","😐","😌","😀","🤩"]

const Dashboard = () => { 





    return `

        <div class="dashboard-view">
            <h1 class="dashboard-welcome">Welcome Back, 
            <span id="usernameSlot"></span></h1>
            <section class="mood_graph_container">
                <canvas class="mood_graph" id="moodGraphContainer">
        
                </canvas>
            </section>
            <section class="reflections_toolbar">

            
            </section>
            <section id="reflections_list">

            </section>

            ${FloatingButton({
                id:"openReflectionModal",
                icon: "➕",
                text: "Create Reflection"

            })}

        </div>
    
    `




}

const GRADIENT_COLORS = "ff1919,ffa300,ffec00,01fdff,10ffb6,10ff7b".split(",").map(hexCode=>`#${hexCode}`)

export const DashboardInit =  async () => { 
    const currentUser = JSON.parse(localStorage.getItem("user")!)
    const moodGraph:HTMLCanvasElement = document.querySelector("#moodGraphContainer")!
    const reflections = await getReflections()
    console.log(reflections)

    const usernameSlot = document.querySelector("#usernameSlot");
    if(usernameSlot){
        usernameSlot.textContent = currentUser.username
    }
    let EMPTY_LABELS = Array(reflections.length).fill(" ")
    let gradient:CanvasGradient, height:number, width:number;

    const moodChart = new Chart(moodGraph!.getContext("2d")!,{ 
        type: "line",
        data: {
            labels:EMPTY_LABELS ,
            datasets: [{
                label: "",
                fill: true,
                backgroundColor: "transparent",
                borderColor: function(context){
                    const chart = context.chart
                    const {ctx,chartArea} = chart;
                    if(!chartArea){
                        return
                    } else { 
                        const chartWidth = chartArea.right - chartArea.left;
                        const chartHeight = chartArea.bottom - chartArea.top;
                        if (!gradient || width !== chartWidth || height !== chartHeight) {
                          // Create the gradient because this is either the first render
                          // or the size of the chart has changed
                          width = chartWidth;
                          height = chartHeight;
                          gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                          let counter:number = 0
                          for(let i = 0; i < 1; i+=0.2){
                            gradient.addColorStop(i,GRADIENT_COLORS[counter++])
                            
                          }
                        
                         
                        }
                      
                        return gradient;
                      
                    }

                },
                tension: 0.5,
                data: reflections.sort(sortByReverseChronologyReflection).reverse().map(r=>(r.mood))
            }]
        }, 
        
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                     callbacks: {
                        label: function(tooltipItem) {
                               return MOOD_ENUM[tooltipItem.parsed.y]
                        }
                     }
                },
            },
            animations: {
                tension: {
                    duration: 3000,
                    easing: 'easeInElastic',
                    from: 0.7, to: 0.3   ,
                    loop: false,
                },
            },
            transitions: {
                show: {
                    animations: {
                        x: {from: 0},
                        y: {from: 0},
                    }
                },
                hide: {
                    animations: {
                        x: {to: 0},
                        y: {to: 0},
                    }
                }
                
            },


            scales: {
                x: {
                    grid: {display: false},
                    labels: EMPTY_LABELS,
                    display: false,
                },
                y: {
                    grid: {display: false},
                    labels: EMPTY_LABELS,
                    display: false,
                    beginAtZero: true
                },
             
            },
            
        }
    });


    const listSection = document.querySelector("#reflections_list")!
    listSection.innerHTML = ReflectionListContent(reflections)

  

    
    
}





export default Dashboard



const sortByReverseChronologyReflection = (a:IReflectionResponse,b:IReflectionResponse)=>a.dateString < b.dateString ? 1 : a.dateString > b.dateString ? -1 : a.time < b.time ? 1 : a.time > b.time ? -1 : 0
function ReflectionListContent(reflections:IReflectionResponse[]){
    return reflections.sort(sortByReverseChronologyReflection).map((reflection:any)=>ListItemInteractive({
        color: GRADIENT_COLORS[reflection.mood],
        id:`reflectionCard_${reflection.id}`,
        title: reflection.time,
        muted_subtitle: reflection.dateString,
        main_content: `
            <div class="reflection-list-content">
                <h5>You felt ${MOOD_ENUM[reflection.mood]}</h5>
                <p>
                    ${reflection.content}
                </p>
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
}


async function getReflections(){
    const user = JSON.parse(localStorage.getItem("user")!)

    let response:IReflectionResponse[] = []

    try {
        const snapshot = await getDocs(
          query(
            collection(db,"reflections"),
            where("_author", "==", user.uid)
          )
        )
        snapshot.docs.forEach(doc=>{
          let r:any= doc.data()
          r["_id"] = doc.id
          response.push(r)
        })
        console.log(response)
        const list = document.querySelector("#reflections_list")
        console.log(list)
        return response
    } catch (error) {
        console.error(error)
        return []
    }
}


interface IReflectionResponse { 
    _id: string,
    _author: string 
    mood: number, 
    content: string, 
    dateString: string,
    time: string
}