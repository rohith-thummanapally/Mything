import { useState,useEffect } from "react";
import '../styles/expenses.css';
//import '../styles/dashboard.css';
import Sidebar from "../components/Sidebar.js";
import { useDispatch,useSelector } from "react-redux";
import { getExpensesThunk,addExpenseThunk,expensesreducer,expensesactions,expensesstate } from "../redux/expensesSlice.js";
import { Form } from "react-router-dom";
export default function Expenses(props)
{
    const dispatch=useDispatch();
    let {expenses,categories,tags}=useSelector(expensesstate);
    console.log('from expenses screen');
    console.log(expenses);
    const [formdata,setformdata]=useState({date:"",amount:0,category:'',name:''});
    async function getExpenses()
    {
        dispatch(getExpensesThunk());
    }
    function updateformdata(e)
    {
        let tname=e.target.id;
        setformdata((prev)=>({...prev,[e.target.id]:e.target.value}));
    }
    useEffect(()=>{
        getExpenses();
    },[]);
    function submitform(e)
    {
        e.preventDefault();
        let seltagslen=e.target[3].selectedOptions.length;
        let seltags=[];
        for(let i=0;i<seltagslen;i++)
        {
            seltags.push(Number(e.target[3].selectedOptions[i].value));
        }
        formdata['tags']=seltags;
        dispatch(addExpenseThunk(formdata));
    }
    function Expensestable()
    {
        return (
            <table className="expensestable">
                <thead>
                <tr>
                    <th className="exptableheader" style={{width:'5%'}}>Sno</th>
                    <th className="exptableheader">Note</th>
                    <th className="exptableheader">Category</th>
                    <th className="exptableheader">Cost</th>
                    <th className="exptableheader">Tag</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((item,index)=>{
                    return (
                        <tr>
                            <td className="exptabledata">{index+1}</td>
                            <td className="exptabledata">{item['name']}</td>
                            <td className="exptabledata">{item['category_name']}</td>
                            <td className="exptabledata">{item['amount']}</td>
                            <td className="exptabledata">{item['tags']}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
    return (
        <div className="expenses">
        <Sidebar />
        <div className="pagestyle">
            <div className="pageheader">
                Expenses
            </div>
            <div className="expensesbody">
                <div className="expensesdata">
                    <div className="expensesfilters">
                        
                    </div>
                    <div className="recentexpenses">
                        <Expensestable />
                    </div>
                </div>
                <div className="addexpense">
                    <form className="expenseform" onSubmit={(e)=>{submitform(e)}}>
                        <p>ADD Expense</p>
                        <p className="expenseformlabel">Date</p>
                        <input className="expenseforminpfield" id="date" required onChange={(e)=>{updateformdata(e)}} type="date"/>

                        <p className="expenseformlabel">Amount</p>
                        <input className="expenseforminpfield" id="amount" required onChange={(e)=>{updateformdata(e)}} type="number" />

                        <p className="expenseformlabel">Category</p>
                        <select className="expenseforminpfield" id="category" required onChange={(e)=>{updateformdata(e)}}>
                            <option value="1">Food</option>
                            <option value="2">Travel</option>
                        </select>

                        <p className="expenseformlabel">Tags</p>
                        <select multiple id="tags" required name="tags">
                            <option value="1">Mandatory</option>
                            <option value="2">Non-Mandatory</option>
                            <option value="3">Waste</option>
                        </select>
                        <p className="expenseformlabel">Notes</p>
                        <input className="expenseforminpfield" type="text" id="name" required onChange={(e)=>{updateformdata(e)}}   />
                        <p className="expenseformlabel"></p>
                        <input className="expenseforminpfield" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}