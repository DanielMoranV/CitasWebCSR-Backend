import { Router } from "express";
import AppointmentHandler from "../controllers/AppointmentController";

const appointmentHandler = new AppointmentHandler();

const router = Router();

router.post("/", appointmentHandler.createAppointment);

export default router;
