import {Request, Response,NextFunction} from 'express';


export  class MiddlewareLogin{


    public isLogged(req:Request,res: Response,next:NextFunction){
        if(true) return next();
    }




}