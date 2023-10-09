import { Router } from "express";
import AppointmentHandler from "../controllers/AppointmentController";

const appointmentHandler = new AppointmentHandler();

const router = Router();

router.post("/", appointmentHandler.createAppointment);
router.get("/:appointmentId", appointmentHandler.getAppointmentId);

export default router;
