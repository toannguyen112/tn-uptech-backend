
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { BannerController } from "../modules/controllers/banner.controller";

export class BannerRoute implements Routes {
    public path = '/banners';
    public router = Router();
    public banner = new BannerController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.banner.index);
        this.router.get(`${this.path}/getListBanner`, this.banner.getListBanner);
        this.router.post(`${this.path}/create`, this.banner.create);
        this.router.get(`${this.path}/show/:id`, this.banner.show);
        this.router.put(`${this.path}/update/:id`, this.banner.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.banner.delete);
    }
}