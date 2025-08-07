import db from "../../middlewares/dbconn.js";
import { validateuser } from "../../utils/myfunctions.js";
export default class Expensesmodel
{
    constructor()
    {

    }

    async addtags()
    {

    }

    async addCategory()
    {

    }

    async gettags(userid)
    {
        try{
            let tags=await db.query("select id,tag_name from base_tags where userid in (0,?)",[userid]);
            console.log(tags);
            let fintags=tags[0];
            if(fintags.length>0)
            {
                return {"success":true,"data":fintags,"msg":"Data retrieved successfully"};
            }
            else
            {
                return {"success":true,"data":[],"msg":"No Data Found"};
            }
        }
        catch(err)
        {
            console.log(err);
            return {"success":false,"msg":"Something Failed, please try again later"};
        }
    }

    async getcategories(userid)
    {
        console.log('get categories model');
        try
        {
            let categoires=await db.query("select id,category_name from base_categories where userid in (0,?)",[userid]);
            console.log(categoires);
            let fincategories=categoires[0];
            if(fincategories.length>0)
            {
                return {"success":true,"data":fincategories,"msg":"Data retrieved successfully"};
            }
            else
            {
                return {"success":true,"data":[],"msg":"No Data Found"};
            }
        }
        catch(err)
        {
            console.log(err);
            return {"success":false,"msg":"Something Failed, please try again later"};
        }
    }

    async addExpense(userid,name,amount,category,tags,edate)
    {
        console.log('in add Expense model');
        let retobj={"success":false,insertId:0,msg:""};
        try{
            let user=await validateuser(userid);
            tags=tags.join(',');
            console.log(tags);
            if(user)
            {
                //console.log('in if');
                let insid=await db.query("insert into base_expenses (`userid`,`name`,`amount`,`category`,`tags`,`date`,`createdon`,`modifiedon`) values (?,?,?,?,?,?,?,?)",[userid,name,amount,category,tags,edate,new Date(),new Date()]);
                console.log(insid);
                if(insid[0]['affectedRows'])
                {
                    let insertid=insid[0]['insertId'];
                    retobj["msg"]="Expense Added Successfully";
                    retobj["success"]=true;
                    retobj["data"]=insertid;
                    //res.status(201).send({"msg":,insertId:insertid,success:true});
                    return retobj;
                }   
                else
                {
                    retobj["msg"]="Something failed, please try again later";
                    retobj["success"]=false;
                    retobj["data"]=-1;
                    //res.status(400).send({"msg":"Something failed, please try again later",success:false});
                    return retobj;
                }
            }
            else
            {
                retobj["msg"]="User not found";
                retobj["success"]=false;
                retobj["data"]=-1;
                return retobj;
                //res.status(500).send({"msg":"user not found",success:false});
            }
        }
        catch(err)
        {
            retobj["msg"]="Something failed, please try again later";
            retobj["success"]=false;
            retobj["data"]=-1;
            //res.status(500).send({"msg":"user not found",success:false});
            console.log(err);
            return retobj;
        }
    }
    async getdaywiseExpenses(userid,fromdate,todate,categories,tags)
    {
        try{
            console.log('in get daywise expenses Model');
            let variables=[userid];
            let categorycond='';
            if(categories)
            {
                categorycond=' and be.category=? ';
                variables.push(categories);
            }   
            let tagcond='';
            if(tags && tags.length>0)
            {
                tagcond=' and find_in_set(bt.id, ?) ';
                variables.push(tags.join(','));
            }
            let fromdatecond='';
            if(fromdate)
            {
                fromdatecond=' and date(be.date) >= ? ';
                variables.push(fromdate);
            }
            let todatecond='';
            if(todate)
            {
                todatecond=' and date(be.date) <= ? ';
                variables.push(todate);
            }

            let daywiseexpenses=await db.query(`select t.fdate,sum(t.amount) as expense from ( select date(be.date) fdate,amount  from base_expenses be join base_categories bc on bc.id=be.category , base_tags bt where find_in_set(bt.id,be.tags) and be.userid=? ${categorycond} ${tagcond} ${fromdatecond} ${todatecond} group by be.id,date(be.date))t where 1 oup by t.fdate order by t.fdate asc`,variables);
            return daywiseexpenses[0];
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async gettagwiseExpenses(userid,fromdate,todate,categories,tags)
    {
        try{
            console.log('in get tag expenses Model');
            let variables=[userid];
            let categorycond='';
            if(categories && 1==0)
            {
                categorycond=' and be.category=? ';
                variables.push(categories);
            }   
            let tagcond='';
            if(tags && tags.length>0)
            {
                tagcond=' and find_in_set(bt.id, ?) ';
                variables.push(tags.join(','));
            }
            let fromdatecond='';
            if(fromdate)
            {
                fromdatecond=' and date(be.date) >= ? ';
                variables.push(fromdate);
            }
            let todatecond='';
            if(todate)
            {
                todatecond=' and date(be.date) <= ? ';
                variables.push(todate);
            }

            let tagwiseexpenses=await db.query(`select bt.id,bt.tag_name,sum(be.amount) as amount  from base_expenses be join base_categories bc on bc.id=be.category , base_tags bt where find_in_set(bt.id,be.tags) and be.userid=? ${categorycond} ${tagcond} ${fromdatecond} ${todatecond} group by bt.id `,variables);
            return tagwiseexpenses[0];
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getcategorywiseExpenses(userid,fromdate,todate,categories,tags)
    {
        try{
            console.log('in get category expenses Model');
            let variables=[userid];
            let categorycond='';
            if(categories)
            {
                categorycond=' and be.category=? ';
                variables.push(categories);
            }   
            let tagcond='';
            if(tags && tags.length>0 && 1==0)
            {
                tagcond=' and find_in_set(bt.id, ?) ';
                variables.push(tags.join(','));
            }
            let fromdatecond='';
            if(fromdate)
            {
                fromdatecond=' and date(be.date) >= ? ';
                variables.push(fromdate);
            }
            let todatecond='';
            if(todate)
            {
                todatecond=' and date(be.date) <= ? ';
                variables.push(todate);
            }

            let tagwiseexpenses=await db.query(`select bc.id,bc.category_name,sum(be.amount) as amount  from base_expenses be join base_categories bc on bc.id=be.category , base_tags bt where find_in_set(bt.id,be.tags) and be.userid=? ${categorycond} ${tagcond} ${fromdatecond} ${todatecond} group by bc.id `,variables);
            return tagwiseexpenses[0];
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getuserExpenses(userid,start,limit,categories,tags,fromdate,todate)
    {
        try
        {
            console.log('in get user expenses model');
            let variables=[userid];
            let categorycond='';
            if(categories)
            {
                categorycond=' and be.category=? ';
                variables.push(categories);
            }   
            let tagcond='';
            if(tags && tags.length>0)
            {
                tagcond=' and find_in_set(bt.id, ?) ';
                variables.push(tags.join(','));
            }
            let fromdatecond='';
            if(fromdate)
            {
                fromdatecond=' and date(be.date) >= ? ';
                variables.push(fromdate);
            }
            let todatecond='';
            if(todate)
            {
                todatecond=' and date(be.date) <= ? ';
                variables.push(todate);
            }
            variables.push(limit);
            variables.push(start);
            //select be.id,be.name,be.amount,bc.category_name,group_concat(bt.tag_name),be.createdon from base_expenses be join base_categories bc on be.category=bc.id , base_tags bt where find_in_set(bt.id,be.tags) and userid=1 group by be.id order by be.createdon desc limit 3 offset 0; 
            let userexpenses=await db.query(`select be.*,bc.category_name,group_concat(bt.tag_name)  from base_expenses be join base_categories bc on bc.id=be.category , base_tags bt where find_in_set(bt.id,be.tags) and be.userid=? ${categorycond} ${tagcond} ${fromdatecond} ${todatecond} group by be.id order by be.date desc limit ? offset ?`,variables);
            return userexpenses[0];
        }
        catch(err)
        {
            console.log(err);
        }
    }
}