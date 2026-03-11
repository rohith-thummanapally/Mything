import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TimerComponent from "../components/timercomponent.js";
import Sidebar from "../components/Sidebar.js";
import { counterActions, counterReducer, counterState } from "../redux/testSlice.js";
export default function Journals() {
    return (
        <div className="flex flex-row min-h-full ">
            <Sidebar />
            <div className="flex flox-col">

            </div>
        </div>
    )
}