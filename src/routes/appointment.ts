import { Router } from "express";
import AppointmentHandler from "../controllers/AppointmentController";

const appointmentHandler = new AppointmentHandler();

const router = Router();

//appointment
router.post("/", appointmentHandler.createAppointment);
router.post("/appointmenthistory", appointmentHandler.createAppointmentHistory);
router.get(
  "/appointmenthistory/:userId",
  appointmentHandler.getAppointmentsHistoryUser
);
router.put(
  "/appointmenthistory/:appointmentHistoryId",
  appointmentHandler.updateAppointmentHistoryId
);
router.get("/", appointmentHandler.getAppointment);
router.get("/:appointmentId", appointmentHandler.getAppointmentId);
router.get("/doctor/:doctorId", appointmentHandler.getAppointmentDoctorId);
router.get("/user/:userId", appointmentHandler.getAppointmentUserId);
router.delete("/:appointmentId", appointmentHandler.deleteAppointmentId);
router.put("/:appointmentId", appointmentHandler.updateAppointmentId);

export default router;
