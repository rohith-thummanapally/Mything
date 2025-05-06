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

    async addExpense(userid,name,amount,category,tags)
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
                let insid=await db.query("insert into base_expenses (`userid`,`name`,`amount`,`category`,`tags`,`createdon`,`modifiedon`) values (?,?,?,?,?,?,?)",[userid,name,amount,category,tags,new Date(),new Date()]);
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
                fromdatecond=' and date(be.createdon) >= ? ';
                variables.push(fromdate);
            }
            let todatecond='';
            if(todate)
            {
                todatecond=' and date(be.createdon) <= ? ';
                variables.push(todate);
            }
            variables.push(limit);
            variables.push(start);
            //select be.id,be.name,be.amount,bc.category_name,group_concat(bt.tag_name),be.createdon from base_expenses be join base_categories bc on be.category=bc.id , base_tags bt where find_in_set(bt.id,be.tags) and userid=1 group by be.id order by be.createdon desc limit 3 offset 0; 
            let userexpenses=await db.query(`select be.*,bc.category_name,group_concat(bt.tag_name)  from base_expenses be join base_categories bc on bc.id=be.category , base_tags bt where find_in_set(bt.id,be.tags) and be.userid=? ${categorycond} ${tagcond} ${fromdatecond} ${todatecond} group by be.id order by be.createdon desc limit ? offset ?`,variables);
            return userexpenses[0];
        }
        catch(err)
        {
            console.log(err);
        }
    }
}