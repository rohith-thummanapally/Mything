import { useState,useEffect,progress } from "react";

export default function TimerComponent()
{
    let iniinterval=Math.floor(Math.random()*(5000-1000)+1000);
    let iniincr=Math.floor(Math.random()*(5-1)+1);
    const [intervalid,setintervalid]=useState('');
    const [value,updvalue]=useState(0);
    const [timeinterval,updtimeinterval]=useState(iniinterval);
    const [incr,updincr]=useState(iniincr);
    useEffect(()=>{      
            let myintervalid=setInterval(()=>{
            updvalue(prev=>prev+incr)
            },timeinterval)
            setintervalid(myintervalid);
    },[]);
    useEffect(()=>{
        console.log(value);
        if(value>=10)
        {
            clearInterval(intervalid);
        }
    },[value])
    return (
        <div>
        <progress  value={value} min={0} max={10} />
        {value}---- 
        {timeinterval}
        ----{incr}
        </div>
    )       
}