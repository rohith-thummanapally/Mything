import { validateuser } from "../../utils/myfunctions.js";
import Expensesmodel from "./expenses.model.js";

export default class Expensescontroller
{
    constructor()
    {
        this.expensesmodel=new Expensesmodel();
    }
    async addExpense(req,res,next)
    {
        console.log('in add Expense controller');
        console.log(req.body);
        try{
            let {userid,name,amount,category,tags}=req.body;
            if(userid && name && category)
            {
                let response=await this.expensesmodel.addExpense(userid,name,amount,category,tags);
                if(response["success"])
                {
                    return res.status(201).send({"msg":response['msg'],"data":response["data"]});
                }
                else
                {
                    return res.status(400).send({"msg":response["msg"],"data":response["data"]});
                }
            }
            else
            {
                return res.status(500).send({"msg":'Some of the required mandatory fields are missing please check'});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async getuserExpenses(req,res,next)
    {
        try
        {
            console.log('in get user Expenses controller');
            let {userid,start,limit,categoires,tags,fromdate,todate}=req.body;
            let user=validateuser(userid);
            if(!user)
            {
                return res.status(500).send({"success":false,"msg":"User Not Found"});
            }
            else
            {
                let data=await this.expensesmodel.getuserExpenses(userid,start,limit,categoires,tags,fromdate,todate);
                console.log('in after getting data');
                console.log(data);
                return res.status(201).send({"success":true,"msg":"Data found successfully","data":data});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async addtags(req,res,next)
    {

    }

    async addcategeories(req,res,next)
    {

    }

}