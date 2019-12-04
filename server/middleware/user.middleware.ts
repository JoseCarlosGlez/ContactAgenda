import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { key } from '../config/config';
import { requestWithJWT } from '../interface/interfaces';


export class MiddlewareLogin {


    public isLogged(req: requestWithJWT, res: Response, next: NextFunction) {

        const Token = req.get('Authorization');

        if(Token){

            jwt.verify(Token,key,(err, decoded)=>{

             if(err){
                    return res.status(401).json({
                        message:'invalid Token',
                        err
                    })
                        
                }else{
                    req.decode=decoded.toString(); 
                    next();
                }

            })

        }else{
            return res.status(400).json({
                message:'Token no provider'
            })


        }

    }




}