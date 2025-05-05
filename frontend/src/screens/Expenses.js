import { useState,useEffect } from "react";
import '../styles/expenses.css';
import '../styles/dashboard.css';
import Sidebar from "../components/Sidebar.js";
import { useDispatch } from "react-redux";
import { getExpensesThunk,addExpenseThunk } from "../redux/expensesSlice.js";
export default function Expenses(props)
{
    const dispatch=useDispatch();
    async function getExpenses()
    {
        dispatch(getExpensesThunk());
    }
    useEffect(()=>{
        getExpenses();
    },[]);
    return (
        <div className="expenses">
        <Sidebar />
        <div className="pagestyle">
            <div className="pageheader">
                Expenses
            </div>
            <div>

            </div>
        </div>
        </div>
    )
}