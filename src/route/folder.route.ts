import { Router } from "express";
import { FolderController } from "../modules/controllers/folder.controller";
import { Routes } from "../interface/routes.interface";

export class FolderRoute implements Routes {
    public path = '/folders';
    public router = Router();
    public folder = new FolderController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.folder.index);
        this.router.post(`${this.path}/get-medias`, this.folder.getMedias);
        this.router.post(`${this.path}/create`, this.folder.create);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.folder.delete);
    }
}
