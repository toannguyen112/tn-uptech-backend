
import { Router } from "express";
import { Routes } from "../interface/routes.interface";

export class CommontRoute implements Routes {
    public path = '/commonts';
    public router = Router();


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {}
}