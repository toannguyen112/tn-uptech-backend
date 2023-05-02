
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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

//file filter for extention
let fileFilter = function (req, file, cb) {
    console.log(file.mimetype)
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 ** 7 },
    fileFilter: fileFilter
});
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
