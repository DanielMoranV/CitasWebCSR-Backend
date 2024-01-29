import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import {
  createAppointment,
  getAppointment,
  getAppointmentId,
  getAppointmentsUserId,
  deleteAppointment,
  getAppointmentDoctorId,
  updateAppointment,
  createAppointmentHistory,
  getAppointmentsHistoryUser,
  updateAppointmentHistory,
  getAppointmentDoctorIdByDay,
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
  public async createAppointmentHistory(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = req.body;
    try {
      await updateAppointment(Number(data.appointmentId), {
        status: "atendido",
      });
      const newAppointment = await createAppointmentHistory(data);
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
      const message = "Operación exitosa Lista de empleados";
      success({ res, data: appointment, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async updateAppointmentHistoryId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const appointmentHistoryId = Number(req.params.appointmentHistoryId);
      const data = req.body;
      const appointmentHistory = await updateAppointmentHistory(
        appointmentHistoryId,
        data
      );
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: appointmentHistory, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async updateAppointmentId(req: Request, res: Response): Promise<void> {
    try {
      const appointmentId = Number(req.params.appointmentId);
      const data = req.body;
      const appointment = await updateAppointment(appointmentId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: appointment, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async deleteAppointmentId(req: Request, res: Response): Promise<void> {
    try {
      const appointmentId = Number(req.params.appointmentId);
      const { timeSlotId } = await getAppointmentId(appointmentId);
      await updateTimeSlot(Number(timeSlotId), { availableTurn: true });
      const appointment = await updateAppointment(appointmentId, {
        status: "Anulado",
        timeSlotId: null,
      });
      const message = "Operación exitosa Registro Eliminado";
      // trabajar cuando no encuentra dni
      success({ res, data: appointment, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getAppointmentsHistoryUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const user = await getAppointmentsHistoryUser(userId);
      const message = "Operación exitosa Lista de empleados";
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getAppointmentUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const user = await getAppointmentsUserId(userId);
      const message = "Operación exitosa Lista de empleados";
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  public async getAppointmentDoctorId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const doctorId = Number(req.params.doctorId);
      const user = await getAppointmentDoctorId(doctorId);
      const message = "Operación exitosa Lista de turnos";
      success({ res, data: user, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getAppointmentDoctorIdByDay(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const doctorId = Number(req.params.doctorId);
      const day = new Date(req.params.day);
      console.log(req.params.day);
      const user = await getAppointmentDoctorIdByDay(doctorId, day);
      const message = "Operación exitosa Lista de turnos";
      success({ res, data: user, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getAppointment(req: Request, res: Response): Promise<void> {
    try {
      const user = await getAppointment();
      const message = "Operación exitosa Lista de empleados";
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default AppointmentHandler;
