import LoginModel from "./login.model.js";
import jwt from "jsonwebtoken";
export default class Logincontroller {
    constructor() {
        this.loginModel = new LoginModel();
    }

    async login(req, res, next) {
        try {
            console.log('from login controller');
            let { email, password } = req.body;
            console.log(req.body);
            if (!email || !password) {
                res.status(400).send('some details are missing');
            }
            else {
                let accres = await this.loginModel.checklogin(email, password);
                if (accres['success'] == true) {
                    let jwtsecret = process.env.JWT_SECRET;
                    let userid = accres['userid'];
                    let jwttoken = jwt.sign({ "userid": userid }, jwtsecret, { expiresIn: 15 * 60 });
                    return res.status(201).send({ "status": "success", "msg": "Logged in Successfully", "data": { "token": jwttoken } })
                }
                else {
                    return res.status(400).send({ "status": "error", "msg": "Invalid Credentials", "data": {} })
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    async createAccount(req, res, next) {
        try {
            let { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).send('some details are missing');
            }
            else {
                let accres = await this.loginModel.createAccount(name, email, password);
                if (accres['success'] == true) {
                    let jwtsecret = process.env.JWT_SECRET;
                    let userid = accres['userid'];
                    let jwttoken = jwt.sign({ "id": userid }, jwtsecret, { expiresIn: 15 * 60 });
                    return res.status(201).send({ "status": "success", "msg": "Account Created Successfully", "data": { "token": jwttoken } })
                }
                else {
                    return res.status(400).send({ "status": "error", "msg": "Account Creation Failed", "data": {} })
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}