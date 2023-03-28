
const fs = require("fs");
const multer = require("multer");
import path from "path";

import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { MediaController } from "../modules/controllers/media.controller";

const pathFolder = "./storage/uploads/";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathFolder);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);

        if (!fs.existsSync(path.join(pathFolder, file.originalname))) cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
export class MediaRoute implements Routes {
    public path = '/medias';
    public router = Router();
    public media = new MediaController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.media.index);
        this.router.post(`${this.path}/create`, upload.array("files"), this.media.create);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.media.delete);
    }
}
