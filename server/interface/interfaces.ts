import {Request} from 'express'

export interface requestWithJWT extends Request{
    decode?:string
}



export interface LoginUser {
    _id:string,
    username:string,
    password:string,
    email:string,
    _v:number

}