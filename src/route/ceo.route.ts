
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { CeoController } from "../modules/controllers/ceo.controller";

export class CeoRoute implements Routes {
    public path = '/ceos';
    public router = Router();
    public ceo = new CeoController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ceo.index);
        this.router.get(`${this.path}/getListCeo`, this.ceo.getListCeo);
        this.router.post(`${this.path}/create`, this.ceo.create);
        this.router.get(`${this.path}/show/:id`, this.ceo.show);
        this.router.put(`${this.path}/update/:id`, this.ceo.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.ceo.delete);
    }
}