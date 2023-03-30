
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import AdminController from "../modules/controllers/admin.controller";
export class PostRoute implements Routes {
    public path = '/admins';
    public router = Router();
    public admin = new AdminController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.admin.index);
        this.router.post(`${this.path}/login`, this.admin.login);
        this.router.get(`${this.path}/show/:id`, this.admin.show);
        this.router.put(`${this.path}/update/:id`, this.admin.update);
    }
}