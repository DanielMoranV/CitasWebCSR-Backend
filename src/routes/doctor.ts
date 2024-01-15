import { Router } from "express";

import DoctorsHandler from "../controllers/DoctorController";
import { rootCertificates } from "tls";

const doctorsHandler = new DoctorsHandler();

const router = Router();

// Routes doctors
router.get("/", doctorsHandler.getDoctors);
router.put("/:doctorId", doctorsHandler.updateDoctor);

//schedule
router.get("/:doctorId/schedule", doctorsHandler.getDoctorSchedule);
router.post("/schedule", doctorsHandler.createDoctorSchedule);
router.patch("/schedule/:scheduleId", doctorsHandler.updateSchedule);

// PersonalizedPrice
router.put(
  "/personalizedPrice/:personalizedPriceId",
  doctorsHandler.updatePersonalizedPrice
);

export default router;
