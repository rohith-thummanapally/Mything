import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import TimerComponent from "../components/timercomponent.js";
import Sidebar from "../components/Sidebar.js";
import { counterActions,counterReducer,counterState } from "../redux/testSlice.js";
export default function Notes()
{
    const [timers,updatetimers]=useState([]);
    //const dispatch=useDispatch();
    //let {countervalue}=useSelector(counterState);
    //console.log('counter is'+countervalue);
    //let [mycntr,updcntr]=useState(counter);
    function addtimer(){
        let ttimers=[...timers];
        ttimers.push({"id":Date.now()});
        updatetimers(ttimers);
    }
    function updatetimerval(val)
    {
        let ttimers=[...timers];
        ttimers[val]['value']=ttimers[val]['value']+ttimers[val]['incr'];
        console.log(ttimers);
        updatetimers(ttimers);
    }
    return(
        <div className="flex flex-row min-h-full ">
            <Sidebar />
            {/*<div>
            {timers &&
            timers.map((item,index)=>(
                <TimerComponent id={item['id']}  />
            ))
            }
            </div>
            <button onClick={()=>{addtimer()}}> Add Timer</button>*/}
            <div className="flex flox-col">

            </div>
        </div>
    )
}