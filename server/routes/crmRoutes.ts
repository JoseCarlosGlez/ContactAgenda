import { Request, Response } from 'express'
import * as express from 'express';

import { ContactController } from '../controllers/crmControllers';

export class contactRoutes {

    public ContactController: ContactController = new ContactController();




    public routes(app: express.Application): void {


        app.route('/contact')
        // POST endpoint
        .post(this.ContactController.addNewController)
            
            // Contact detail
            app.route('/contact/:contactId')
            .get(this.ContactController.getContacts)
            .put(this.ContactController.updateContact)
            .delete()


    }




    
}