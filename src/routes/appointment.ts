import { Router } from "express";
import AppointmentHandler from "../controllers/AppointmentController";

const appointmentHandler = new AppointmentHandler();

const router = Router();

//appointment
router.post("/", appointmentHandler.createAppointment);
router.get("/", appointmentHandler.getAppointment);
router.get("/:appointmentId", appointmentHandler.getAppointmentId);
router.get("/user/:userId", appointmentHandler.getAppointmentUserId);
router.delete("/:appointmentId", appointmentHandler.deleteAppointmentId);

export default router;
