// import * as mongoose from 'mongoose';
import Contact from '../models/crmModel';
import { Request, Response } from 'express';

export class ContactController {

    async addNewController(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        await newContact.save().then((Contact) => {
            return res.status(200).json({
                success: true, message: 'User Created', newContact: Contact
            })
        }).catch((err) => res.status(400).json({ success: false, message: err }))
    }

    async getContacts(req: Request, res: Response) {
        if (!req.params.userId) return res.status(404).json({ success: false, message: 'User id is required' })

        await Contact.find({ 'user': req.params.userId })
            .populate('user')
            .exec().then((Contacts) => {
                if (!Contact) return res.status(400).json({ success: false, message: 'This users has no contacts' })

                return res.status(200).json({ success: true, Contacts })
            }).catch((err) => res.status(400).json({ success: false, message: err }))
    }


    async getContactWithName(req: Request, res: Response) {
        await Contact.find({ firstName: req.params.contactName })
            .then((Contact) => {
                if (!Contact) return res.status(400).json({ success: false, message: 'Contact not found' })

                return res.status(200).json({ success: true, Contact })

            }).catch((err) => res.status(400).json({ success: false, message: err }))
    }


    async  getContactWithEmail(req: Request, res: Response) {
        await Contact.find({ email: req.params.contactEmail }).then((Contact) => {
            if (!Contact) return res.status(400).json({ success: false, message: 'Contact not found' })
            return res.status(200).json({ success: true, Contact })

        }).catch((err) => res.status(400).json({ success: false, message: err }))
    }




    async updateContact(req: Request, res: Response) {
        const fields = req.body
        await Contact.findOneAndUpdate({ '_id': req.params.contactId }, {
            "$set": {
                "firstName": fields.firstName,
                "lastName": fields.lastName,
                "email": fields.email,
                "company": fields.company,
                "phone": fields.phone
            }
        }, { new: true }).then((ContactUpdate) => {
            if (!ContactUpdate) return res.status(400).json({ success: false, message: 'User not found' })
            return res.status(200).json({ success: true, message: 'User successfully updated', ContactUpdate })
        }).catch((err) => res.status(400).json({ success: false, message: err }))
    }



    async deleteContact(req: Request, res: Response) {
        await Contact.findByIdAndDelete(req.params.contactId).then((contact) => {
            if (!contact) return res.status(400).json({ success: false, message: 'The contact could not be deleted' });
            return res.status(200).json({ success: true, message: 'Contact removed' })
        }).catch((err) => res.status(400).json({ success: false, message: err }))
    }




}



