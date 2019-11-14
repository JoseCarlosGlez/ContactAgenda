import Express from 'express';
import  bodyParser from "body-parser";
import { contactRoutes } from '../routes/crmRoutes'
import { userRoutes } from '../routes/userRoutes';
import  mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors'
import { whiteList, mongoURL } from '../config/config';

class App {
    public app =Express();
    public contactRoutes: contactRoutes = new contactRoutes();
    public userRoutes:userRoutes= new userRoutes();

    public CorsOption:CorsOptions={
        origin:whiteList
    }

    constructor() {
        this.config();
        this.mongoSetup();
        this.initRoutes();
        
        
    }
    
    private initRoutes(){
        this.contactRoutes.routes(this.app)
        this.userRoutes.routes(this.app)
        
    }


    private config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cors(this.CorsOption))
    }


    private mongoSetup():void{
        mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
            console.log(`Database run in PORT: ${mongoURL}`)
        }).catch((err)=>{
            console.log(err)
        })        

    }
}

export default new App().app