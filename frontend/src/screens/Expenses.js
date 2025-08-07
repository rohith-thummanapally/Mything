import { useState,useEffect } from "react";
import '../styles/expenses.css';
import '../styles/commonstyles.css';
import Sidebar from "../components/Sidebar.js";
import { useDispatch,useSelector } from "react-redux";
import { getExpensesThunk,addExpenseThunk,expensesreducer,expensesactions,expensesstate,getcategoriestagsThunk } from "../redux/expensesSlice.js";
import { Form } from "react-router-dom";
import Recentexpenses from "../components/Recentexpenses.js";
import Expensefilters from "../components/Expensefilters.js";
import Expenseform from "../components/Expenseform.js";
import ExpenseGraphs from "../components/ExpenseGraphs.js";
export default function Expenses(props)
{
    let today=new Date();
    let pastday=new Date();
    pastday.setDate(today.getDate()-30)
    let inifromday=pastday.toISOString().split('T')[0];
    let initoday=new Date().toISOString().split('T')[0];
    let inicategory='';
    let initags=[];
    const dispatch=useDispatch();
    const [showform,toggleform]=useState(true);
    let {categories,tags,allcategories,alltags}=useSelector(expensesstate);

    async function getExpenses(fromday,today,categories,tags)
    {
        dispatch(getExpensesThunk({fromday,today,categories,tags}));
    }
    async function getcattag() 
    {
        dispatch(getcategoriestagsThunk());
    }
    
    useEffect(()=>{
        getExpenses(inifromday,initoday,inicategory,initags);
        getcattag();
    },[]);
    
    
    return (
        <div className="expenses">
        <Sidebar />
        <div className="pagestyle">
            <div className="pageheader">
                <div>
                    Expenses
                </div>
                <div>
                    <input type="button" className="text-lg font-semibold text-white bg-blue-800 p-[3px] px-[8px] rounded-[5px]" value="Add Expense" onClick={()=>{toggleform(true)}}  />
                </div>
            </div>
           
            <div className="expensesbody">
                <div>
                    <div >
                        <Expensefilters />
                    </div>
                </div>
                <div className="expensesdata">
                    <div className="recentexpenses">
                        <Recentexpenses />
                    </div>
                <div className="addexpense">
                    {showform &&
                    <Expenseform closeform={toggleform}/>
                    }
                    {!showform &&
                    <ExpenseGraphs />
                    }   
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}