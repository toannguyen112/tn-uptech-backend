
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { ContactController } from "../modules/controllers/contact.controller";
export class ContactRoute implements Routes {
    public path = '/contacts';
    public router = Router();
    public contact = new ContactController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.contact.index);
        this.router.post(`${this.path}/create`, this.contact.create);
        this.router.get(`${this.path}/show/:id`, this.contact.show);
        this.router.put(`${this.path}/update/:id`, this.contact.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.contact.delete);
    }
}