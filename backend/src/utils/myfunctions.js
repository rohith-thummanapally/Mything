import db from "../middlewares/dbconn.js";

export async function validateuser(userid)
{
    let [res]=await db.query("select * from jos_users where id=?",[userid]);
    if(res.length)
    {
        return true;
    }
    else
    {
        return false;
    }
}