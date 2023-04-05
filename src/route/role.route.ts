
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { RoleController } from "../modules/controllers/role.controller";
export class RoleRoute implements Routes {
    public path = '/roles';
    public router = Router();
    public role = new RoleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.role.index);
        this.router.post(`${this.path}/create`, this.role.create);
        this.router.get(`${this.path}/show/:id`, this.role.show);
        this.router.put(`${this.path}/update/:id`, this.role.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.role.delete);
    }
}