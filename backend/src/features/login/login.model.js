import db from "../../middlewares/dbconn.js";
import { createHash } from 'node:crypto';

export default class LoginModel {
    constructor() {

    }

    async checklogin(email, password) {
        try {
            let retobj = {};
            let encypwd = createHash('md5').update(password).digest('hex');
            let result = await db.query(
                'SELECT * FROM jos_users WHERE email = $1 AND password = $2',
                [email, encypwd]
            );
            console.log(result.rows);
            if (result.rows.length > 0) {
                let userid = result.rows[0]['id'];
                retobj["msg"] = "User Found Successfully";
                retobj["success"] = true;
                retobj["userid"] = userid;
                console.log(retobj);
                return retobj;
            }
            else {
                retobj["msg"] = "Something failed, please try again later";
                retobj["success"] = false;
                retobj["userid"] = -1;
                return retobj;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async createAccount(name, email, password) {
        try {
            let retobj = {};
            let encryptedurl = await this.generateAlphanumericString(20);
            console.log('encrypted url is');
            console.log(encryptedurl);
            let encryptedpassword = createHash('md5').update(password).digest('hex');
            let result = await db.query(
                'INSERT INTO jos_users (name, email, password, encryptedurl, createdon) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [name, email, encryptedpassword, encryptedurl, new Date()]
            );
            if (result.rows.length > 0) {
                let insertid = result.rows[0]['id'];
                retobj["msg"] = "Account Created Successfully";
                retobj["success"] = true;
                retobj["data"] = insertid;
                return retobj;
            }
            else {
                retobj["msg"] = "Something failed, please try again later";
                retobj["success"] = false;
                retobj["data"] = -1;
                return retobj;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async generateAlphanumericString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}