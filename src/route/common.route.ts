
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { CommontController } from "../modules/controllers/commont.controller";
export class CommontRoute implements Routes {
    public path = '/'
    public router = Router();
    public commont = new CommontController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/emptyDirSync`, this.commont.emptyDirSync);
        this.router.get(`${this.path}`, this.commont.index);
    }
}