import { Router } from "express";

import DoctorsHandler from "../controllers/DoctorController";

const doctorsHandler = new DoctorsHandler();

const router = Router();

// Routes users
router.get("/", doctorsHandler.getDoctors);
router.put("/:doctorId", doctorsHandler.updateDoctor);

// PersonalizedPrice
router.put(
  "/personalizedPrice/:personalizedPriceId",
  doctorsHandler.updatePersonalizedPrice
);

export default router;
