import { Router } from "express";
import fs from "fs";
import path from "path";
import MediaController from "../../../controllers/medias/media.controller";
const multer = require("multer");

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
const mediaRoute = Router();

mediaRoute.get("/medias/index", MediaController.index);
mediaRoute.get("/medias/show/:id", MediaController.show);
mediaRoute.post("/medias/store", upload.array("files"), MediaController.store);

export { mediaRoute };
