import { validationResult } from "express-validator";
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from "../environments/env";

export class GlobalCheckErrorMiddleWare {

    static checkError(req, res, next) {
        const error = validationResult(req);
        console.log("eror",error)
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg))
        } else {
            next();
        }
    }

    static async authentication(req, res, next) {
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader.startsWith("Bearer ")){
            token  = authHeader ? authHeader.slice(7, authHeader.length) : null;
        } else {
            token  = authHeader ? authHeader : null;
        }
        try {
            req.errorStatus = 401;
            Jwt.verify(token, getEnvironmentVariable().jwt_secret, (err, decoded) => {                
                if (err) {                    
                    next(err)
                }
                else if (!decoded) {                    
                    next(new Error('User Not Authorised'))
                }
                else {                    
                    req.user = decoded;
                    next();
                }

            })
        }
        catch (e) {

        }

    }

}