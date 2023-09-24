import { Router } from "express";

import DoctorsHandler from "../controllers/DoctorController";

const doctorsHandler = new DoctorsHandler();

const router = Router();

// Routes users
router.get("/", doctorsHandler.getDoctors);

export default router;
