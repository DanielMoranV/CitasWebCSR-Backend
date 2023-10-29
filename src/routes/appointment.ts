import { Router } from "express";
import AppointmentHandler from "../controllers/AppointmentController";

const appointmentHandler = new AppointmentHandler();

const router = Router();

router.post("/", appointmentHandler.createAppointment);
router.get("/", appointmentHandler.getAppointment);
router.get("/:appointmentId", appointmentHandler.getAppointmentId);
router.get("/user/:userId", appointmentHandler.getAppointmentUserId);

export default router;
