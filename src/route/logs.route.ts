
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { LogController } from "../modules/controllers/log.controller";
export class PostRoute implements Routes {
    public path = '/logs';
    public router = Router();
    public log = new LogController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.log.index);
    }
}