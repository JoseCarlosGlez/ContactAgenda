import { Request, Response } from 'express'
import * as express from 'express';

import { ContactController } from '../controllers/crmControllers';
import { MiddlewareLogin } from '../middleware/user.middleware';

export class contactRoutes {

    public ContactController: ContactController = new ContactController();

    public Middleware: MiddlewareLogin = new MiddlewareLogin();




    public routes(app: express.Application): void {


        app.route('/contact')
            .post(this.Middleware.isLogged, this.ContactController.addNewController)

        app.route('/contact/:contactId')
            .put(this.Middleware.isLogged, this.ContactController.updateContact)
            .delete(this.Middleware.isLogged, this.ContactController.deleteContact)

        app.route('/contact/:contactName')
            .get(this.Middleware.isLogged, this.ContactController.getContactWithName)

        app.route('/contact/:contactEmail')
            .get(this.Middleware.isLogged, this.ContactController.getContactWithEmail)

        app.route('/contact/:userId')
            .get(this.Middleware.isLogged, this.ContactController.getContacts)
    }





}