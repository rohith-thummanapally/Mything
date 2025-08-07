import LoginModel from "./login.model";
import jwt from "jsonwebtoken";
export default class Logincontroller
{
    constructor()
    {
        this.loginModel=new LoginModel();
    }

    async checklogin(req,res,next)
    {
        try{

        }
        catch(err)
        {
            console.log(err);
        }
    }

    async createAccount(req,res,next)
    {
        try{
            let {name,email,password}=req.body;
           if(!name || !email || !password)
           {
                res.status(400).send('some details are missing');
           }
           else
           {
            let accres=await this.loginModel.createAccount(name,email,password);
            if(accres['status']=='success')
            {
                let jwtsecret='87368doiqjdijDWJWQHDDWAEYAIU3RGS83YRO34';
                let userid=accres['userid'];
                let jwttoken=jwt.sign({"id":userid},jwtsecret,{expiresIn:15*60});
                return res.status(201).send({"status":"success","msg":"Account Created Successfully","data":{"token":jwttoken}})
            }
           }
        }
        catch(err)
        {
            console.log(err);
        }
    }
}