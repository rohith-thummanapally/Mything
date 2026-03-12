import db from "../middlewares/dbconn.js";

export async function validateuser(userid) {
    let result = await db.query("SELECT * FROM jos_users WHERE id = $1", [userid]);
    console.log('res is', result.rows);
    if (result.rows.length) {
        return true;
    }
    else {
        return false;
    }
}