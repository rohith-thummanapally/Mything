import Expensescontroller from "./expenses.controller.js";
import e from 'express';
const expenseRouter=e.Router();
const expensecontrollerobj=new Expensescontroller();

expenseRouter.post('/addexpense',(req,res,next)=>{
    expensecontrollerobj.addExpense(req,res,next);
})
expenseRouter.post('/getmyexpenses',(req,res,next)=>{
    expensecontrollerobj.getuserExpenses(req,res,next);
})  

expenseRouter.get('/getcategories',(req,res,next)=>{
    console.log('get categories router');
    expensecontrollerobj.getcategories(req,res,next);
})

expenseRouter.get('/gettags',(req,res,next)=>{
    expensecontrollerobj.gettags(req,res,next);
})

expenseRouter.post('/getdaywiseexpenses',(req,res,next)=>{
    expensecontrollerobj.getdaywiseExpenses(req,res,next);
})

expenseRouter.post('gettagwiseexpenses',(req,res,next)=>{
    expensecontrollerobj.gettagwiseExpenses(req,res,next);
})

expenseRouter.post('getcategorywiseexpenses',(req,res,next)=>{
    expensecontrollerobj.getcategorywiseExpenses(req,res,next);
})
export default expenseRouter;

