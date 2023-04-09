
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { PermissionController } from "../modules/controllers/permission.controller";
export class PermissionRoute implements Routes {
    public path = '/permissions';
    public router = Router();
    public permission = new PermissionController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.permission.index);
    }
}