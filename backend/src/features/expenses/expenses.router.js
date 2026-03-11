import Expensescontroller from "./expenses.controller.js";
import e from 'express';
import jwtauth from '../../middlewares/Auth.js';
const expenseRouter = e.Router();
const expensecontrollerobj = new Expensescontroller();

expenseRouter.post('/addexpense', jwtauth, (req, res, next) => {
    expensecontrollerobj.addExpense(req, res, next);
})
expenseRouter.post('/getmyexpenses', jwtauth, (req, res, next) => {
    expensecontrollerobj.getuserExpenses(req, res, next);
})

expenseRouter.get('/getcategories', jwtauth, (req, res, next) => {
    console.log('get categories router');
    expensecontrollerobj.getcategories(req, res, next);
})

expenseRouter.get('/gettags', jwtauth, (req, res, next) => {
    expensecontrollerobj.gettags(req, res, next);
})

expenseRouter.post('/getdaywiseexpenses', jwtauth, (req, res, next) => {
    expensecontrollerobj.getdaywiseExpenses(req, res, next);
})

expenseRouter.get('/gettagwiseexpenses', jwtauth, (req, res, next) => {
    expensecontrollerobj.gettagwiseExpenses(req, res, next);
})

expenseRouter.get('/getcategorywiseexpenses', jwtauth, (req, res, next) => {
    expensecontrollerobj.getcategorywiseExpenses(req, res, next);
})
export default expenseRouter;

