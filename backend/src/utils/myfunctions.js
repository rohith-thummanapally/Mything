import db from "../middlewares/dbconn.js";

export async function validateuser(userid) {
    let [res] = await db.query("select * from jos_users where id=?", [userid]);
    console.log('res is', res);
    if (res.length) {
        return true;
    }
    else {
        return false;
    }
}