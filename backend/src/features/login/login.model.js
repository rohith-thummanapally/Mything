import db from "../../middlewares/dbconn.js";
import { createHash } from 'node:crypto';

export default class LoginModel {
    constructor() {

    }

    async checklogin(email, password) {
        try {
            let retobj = {};
            let encypwd = createHash('md5').update(password).digest('hex');
            let insid = await db.query('SELECT * FROM jos_users WHERE email = ? AND password = ?', [email, encypwd]);
            console.log(insid);
            if (insid[0].length > 0) {
                let userid = insid?.[0]?.[0]?.['id'];
                retobj["msg"] = "User Found Successfully";
                retobj["success"] = true;
                retobj["userid"] = userid;
                console.log(retobj);
                //res.status(201).send({"msg":,insertId:insertid,success:true});
                return retobj;
            }
            else {
                retobj["msg"] = "Something failed, please try again later";
                retobj["success"] = false;
                retobj["userid"] = -1;
                //res.status(400).send({"msg":"Something failed, please try again later",success:false});
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
            let insid = await db.query('INSERT INTO jos_users (`name`,`email`,`password`,`encryptedurl`,`createdon`) values (?,?,?,?,?)', [name, email, encryptedpassword, encryptedurl, new Date()]);
            if (insid[0]['affectedRows']) {
                let insertid = insid[0]['insertId'];
                retobj["msg"] = "Expense Added Successfully";
                retobj["success"] = true;
                retobj["data"] = insertid;
                //res.status(201).send({"msg":,insertId:insertid,success:true});
                return retobj;
            }
            else {
                retobj["msg"] = "Something failed, please try again later";
                retobj["success"] = false;
                retobj["data"] = -1;
                //res.status(400).send({"msg":"Something failed, please try again later",success:false});
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