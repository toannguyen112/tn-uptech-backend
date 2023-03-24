import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { FolderController } from "../modules/controllers/folder.controller";
export class FolderRoute implements Routes {
    public path = '/folders';
    public router = Router();
    public folder = new FolderController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.folder.index);
        this.router.get(`${this.path}/:id(\\d+)`, this.folder.show);
        this.router.post(`${this.path}`, this.folder.create);
        this.router.delete(`${this.path}/:id(\\d+)`, this.folder.delete);
    }
}
