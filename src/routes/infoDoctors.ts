import { Router } from "express";

import InfoDoctorsHandler from "../controllers/InfoDoctorsController";
import verifyToken from "../midlewares/verifyToken";

const infoDoctorsHandler = new InfoDoctorsHandler();

const router = Router();

// Routes users
router.get("/", infoDoctorsHandler.getInfoDoctors);

export default router;
