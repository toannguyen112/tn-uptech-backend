import express from "express";
import { adminRoute } from "../../../../modules/infra/http/routes/admin.route";
import { folderRoute } from "../../../../modules/infra/http/routes/folder.route";
import { mediaRoute } from "../../../../modules/infra/http/routes/media.route";
import projectRoute from "../../../../modules/infra/http/routes/project.route";
const router = express.Router();

router.get("/", async (req, res) => res.json({ message: "OK", data: "xin chao" }));

router.use(adminRoute);
router.use(folderRoute);
router.use(projectRoute);
router.use(mediaRoute);

export { router };
