
import { Router } from "express";
import { Request, Response, NextFunction } from "express"
import { Routes } from "../interface/routes.interface";

export interface LanguageRequest extends Request {
    lang: string
}

export class LocaleRoute implements Routes {
    public path = '/locale';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, (req: any, res: Response, next: NextFunction) => {

            const lang = req.acceptsLanguages('vi', 'en', 'ja');

            if (lang) {
                req.lang = lang

            } else {
                req.lang = 'en'
            }

            next();
        });
    }
}