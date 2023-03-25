// import { Router } from "express";
// import fs from "fs";
// import path from "path";

// const multer = require("multer");

// const pathFolder = "./storage/uploads/";
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, pathFolder);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.originalname}`);

//     if (!fs.existsSync(path.join(pathFolder, file.originalname))) cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// const mediaRoute = Router();

// mediaRoute.get("/medias/index", MediaController.index);
// mediaRoute.get("/medias/show/:id", MediaController.show);
// mediaRoute.post("/medias/store", upload.array("files"), MediaController.store);

// export { mediaRoute };
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { MediaController } from "../modules/controllers/media.controller";

export class MediaRoute implements Routes {
    public path = '/medias';
    public router = Router();
    public media = new MediaController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.media.index);
        this.router.get(`${this.path}show/:id(\\d+)`, this.media.show);
        this.router.post(`${this.path}/create`, this.media.create);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.media.delete);
    }
}
