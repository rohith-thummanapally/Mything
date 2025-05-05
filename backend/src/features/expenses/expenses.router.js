import Expensescontroller from "./expenses.controller.js";
import e from 'express';
const expenseRouter=e.Router();
const expensecontrollerobj=new Expensescontroller();

expenseRouter.post('/addexpense',(req,res,next)=>{
    expensecontrollerobj.addExpense(req,res,next);
})
expenseRouter.get('/getmyexpenses',(req,res,next)=>{
    expensecontrollerobj.getuserExpenses(req,res,next);
})  

export default expenseRouter;

