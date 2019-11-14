import * as express from 'express';
import { Security } from '../controllers/securityApp';
import { MiddlewareLogin } from '../middleware/user.middleware';

export class userRoutes {

    public userSecurity:Security=new Security();
        


    public routes (app:express.Application):void{
        app.route('/signup')
            .post(this.userSecurity.signUp )

        app.route('/login')
            .post(this.userSecurity.Login)
    }
   
}
