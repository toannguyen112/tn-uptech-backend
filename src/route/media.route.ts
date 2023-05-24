

import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { MediaController } from "../modules/controllers/media.controller";
import uploadCloud from "../config/cloudinary.config";

export class MediaRoute implements Routes {
    public path = '/medias';
    public router = Router();
    public media = new MediaController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.media.index);
        this.router.post(`${this.path}/create`, uploadCloud.array("files"), this.media.create);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.media.delete);
    }
}
