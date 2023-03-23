import express from "express";
import { adminRoute } from "../../../../modules/infra/http/routes/admin.route";
import { mediaRoute } from "../../../../modules/infra/http/routes/media.route";
const router = express.Router();

router.get("/", async (req, res) => res.json({ message: "OK", data: "xin chao" }));

router.use(adminRoute);
router.use(mediaRoute);

export { router };
