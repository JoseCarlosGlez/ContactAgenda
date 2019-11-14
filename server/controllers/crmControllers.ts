// import * as mongoose from 'mongoose';
import Contact from '../models/crmModel';
import { Request, Response } from 'express';

export class ContactController {

    public addNewController(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err, Contact) => {
            if (err) {
                res.send(err)
            }

            res.json(Contact)
        })


    }

    public getContacts(req: Request, res: Response) {

        const idUser:string = req.body.user

        Contact.find({'user':idUser})
                .populate('user')
                .exec((err, Contact) => {
            if (err) {
              return  res.send(err)
            }

          return  res.json(Contact);
        })
    }

    public getContactWithID(req: Request, res: Response) {

        Contact.findById(req.params.contactId, (err, Contact) => {
            if (err) {
                res.send(err)
            }
            res.json(Contact)
        })

    }



    async updateContact(req: Request, res: Response) {

        let id = req.params.contactId;

        let fields = req.body

        let contactUpdate = await Contact.findOneAndUpdate({ '_id': id }, {
            "$set": {
                "firstName": fields.firstName,
                "lastName": fields.lastName,
                "email": fields.email,
                "company": fields.company,
                "phone": fields.phone
            }
        }, { new: true });

        res.json({
            contactUpdate
        })


    }



    deleteContact(req: Request, res: Response) {

    }




}



