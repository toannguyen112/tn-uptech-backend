
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import AdminController from "../modules/controllers/admin.controller";
import { adminAuth } from "../modules/middlewares/adminAuth.middleware";

export class AdminRoute implements Routes {
    public path = '/admins';
    public router = Router();
    public admin = new AdminController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.admin.index);
        this.router.post(`${this.path}/create`, this.admin.create);
        this.router.get(`${this.path}/profile`, adminAuth, this.admin.profile);
        this.router.post(`${this.path}/login`, this.admin.login);
        this.router.post(`${this.path}/logout`, adminAuth, this.admin.logout);
        this.router.get(`${this.path}/show/:id`, this.admin.show);
        this.router.post(`${this.path}/delete/:id`, this.admin.delete);
        this.router.put(`${this.path}/update/:id`, this.admin.update);
    }
}