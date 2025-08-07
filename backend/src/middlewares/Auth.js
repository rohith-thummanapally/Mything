import {jwt} from 'jsonwebtoken';
import 'dotenv/config';

export default jwtauth=(req,res,next)=>{
    try{
        let jwttoken=process.env.jwttoken;
        console.log(jwttoken);
        next();
    }
    catch(error)
    {
        console.log(error);
    }
} 