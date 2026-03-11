import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function jwtauth(req, res, next) {
    try {
        let jwtSecret = process.env.JWT_SECRET;
        let authHeader = req.headers['authorization'];

        if (authHeader) {
            let token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

            jwt.verify(token, jwtSecret, (err, decodedtoken) => {
                if (err) {
                    return res.status(401).send({ "status": "error", "msg": "Invalid Token", "data": {} });
                }

                if (decodedtoken?.userid) {
                    req.userid = decodedtoken.userid;
                    next();
                } else {
                    return res.status(401).send({ "status": "error", "msg": "Invalid Token", "data": {} });
                }
            });
        }
        else {
            return res.status(401).send({ "status": "error", "msg": "Missing Token", "data": {} });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ "status": "error", "msg": "Invalid Token from catch", "data": {} })
    }
} 