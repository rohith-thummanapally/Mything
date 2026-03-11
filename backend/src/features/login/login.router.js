import Logincontroller from "./login.controller.js";
import e from 'express';

let Logincontrollerobj = new Logincontroller();
let LoginRouter = e.Router();

LoginRouter.post('/checklogin', (req, res, next) => {
    Logincontrollerobj.login(req, res, next);
});

LoginRouter.post('/createAccount', (req, res, next) => {
    Logincontrollerobj.createAccount(req, res, next);
})

export default LoginRouter;
