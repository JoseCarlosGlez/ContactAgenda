import { Request, Response } from 'express';
import User from '../models/userModel'
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'
import { key } from '../config/config';
import { LoginUser } from '../interface/interfaces';



export class Security {

    public signUp(req: Request, res: Response) {


        if (req.body.password == null || req.body.username == null) {
            return res.status(401).json({
                success: false,
                message: 'Check params'
            })
        }

        User.findOne({ 'email': req.body.email }, (err, user) => {

            if (err) {
                throw err
            }

            if (user) {
                return res.status(400).json({ success: false, message: "Email already taken" })
            }
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            const newUser = new User(req.body);

            newUser.save((err) => {

                if (err) {
                    throw err
                }

                res.status(201).json({
                    success: true,
                    message: 'User created!'
                })

            })
        })

    }





    public Login(req: Request, res: Response) {



        let userEmail = req.body.email;
        let password = req.body.password;


        User.findOne({'email':userEmail},(err,user:LoginUser)=>{


            if(err){
                throw err
            }

            if(!user){
             return   res.status(400).json({
                 success:false,
                 message:'Login incorrect'
                })
            }

            if(!bcrypt.compareSync(password,user.password)){

                

                
                return res.status(400).json({
                    success:false,
                    message:'Login incorrect',
                })
            }
            const payload:any={
                nombre:userEmail,
                password:user.password
            }
            
            const token= jwt.sign(payload,key,{expiresIn:'24h'})
            delete user.password;
            return res.status(200).json({
                success:true,
                message:'Login successful',
                token,   
                user
            })


        })


    }








}