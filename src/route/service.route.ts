
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { ServiceController } from "../modules/controllers/service.controller";
export class ServiceRoute implements Routes {
    public path = '/services';
    public router = Router();
    public service = new ServiceController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.service.index);
        this.router.post(`${this.path}/create`, this.service.create);
        this.router.get(`${this.path}/show/:id`, this.service.show);
        this.router.put(`${this.path}/update/:id`, this.service.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.service.delete);
    }
}