import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import {
  createAppointment,
  getAppointmentId,
} from "../repository/AppointmentRepository";
import { updateTimeSlot } from "../repository/DoctorsRepository";
class AppointmentHandler {
  public async createAppointment(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const { timeSlotId } = req.body;
      await updateTimeSlot(Number(timeSlotId), { availableTurn: false });
      const newAppointment = await createAppointment(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newAppointment, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getAppointmentId(req: Request, res: Response): Promise<void> {
    try {
      const appointmentId = Number(req.params.appointmentId);
      const appointment = await getAppointmentId(appointmentId);
      if (appointment.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: appointment, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: appointment, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default AppointmentHandler;
