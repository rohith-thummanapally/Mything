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
            let {userid,name,amount,category,tags,date}=req.body;
            if(userid && name && category)
            {
                let response=await this.expensesmodel.addExpense(userid,name,amount,category,tags,date);
                if(response["success"])
                {
                    return res.status(201).send({"success":true,"msg":response['msg'],"data":response["data"]});
                }
                else
                {
                    return res.status(400).send({"success":false,"msg":response["msg"],"data":response["data"]});
                }
            }
            else
            {
                return res.status(500).send({"success":false,"msg":'Some of the required mandatory fields are missing please check'});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getdaywiseExpenses(req,res,next)
    {
        console.log('in get Daywise Expenses Controller');
        console.log(req.body);
        try{
            let {userid,categoires,tags,fromdate,todate}=req.body;
            let user=validateuser(userid);
            if(!user)
            {
                return res.status(500).send({"success":false,"msg":"User Not Found"});
            }
            else
            {
                let data=await this.expensesmodel.getdaywiseExpenses(userid,fromdate,todate,categoires,tags);
                console.log('after getting data');
                console.log(data);
                return res.status(200).send({"success":true,"msg":"data found successfully","data":data});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async gettagwiseExpenses(req,res,next)
    {
        try{
            console.log('in gettagwiseExpenses controller');
            console.log(req.body);
            let {userid,categoires,tags,fromdate,todate}=req.body;
            let user=validateuser(userid);
            if(!user)
            {
                return res.status(500).send({"success":false,"msg":"User Not Found"});
            }
            else
            {
                let data=await this.expensesmodel.gettagwiseExpenses(userid,fromdate,todate,categoires,tags);
                console.log('after getting data');
                console.log(data);
                return res.status(200).send({"success":true,"msg":"data found successfully","data":data});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getcategorywiseExpenses(req,res,next)
    {
        try{
            console.log('in getcategorywiseExpenses controller');
            console.log(req.body);
            let {userid,categoires,tags,fromdate,todate}=req.body;
            let user=validateuser(userid);
            if(!user)
            {
                return res.status(500).send({"success":false,"msg":"User Not Found"});
            }
            else
            {
                let data=await this.expensesmodel.getcategorywiseExpenses(userid,fromdate,todate,categoires,tags);
                console.log('after getting data');
                console.log(data);
                return res.status(200).send({"success":true,"msg":"data found successfully","data":data});
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
            console.log(req.body);
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

    async gettags(req,res,next)
    {
        console.log('get tags controller');
        try{
            let userid=req.body?.userid;
            let tagslist=await this.expensesmodel.gettags(userid);
            if(tagslist["success"]==true)
            {
                return res.status(201).send(tagslist);
            }
            else
            {
                return res.status(400).send(tagslist);
            }
        }
        catch(err)
        {
            console.log(err);
            return res.status(401).send({"success":false,"msg":"Something Failed, try later"});
        }
    }
    async getcategories(req,res,next)
    {
        console.log('get categories controller');
        console.log(req.query);
        try{
            let {userid}=req.query;
            let categorieslist=await this.expensesmodel.getcategories(userid);
            console.log('response from model');
            console.log(categorieslist);
            if(categorieslist["success"]==true)
            {
                return res.status(201).send(categorieslist);
            }
            else
            {
                return res.status(400).send(categorieslist);
            }
        }
        catch(err)
        {
            console.log(err);
            return res.status(401).send({"success":false,"msg":"Something Failed, try later"});
        }
    }
}