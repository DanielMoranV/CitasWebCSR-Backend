import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import { createAppointment } from "../repository/AppointmentRepository";
class AppointmentHandler {
  public async createAppointment(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newAppointment = await createAppointment(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newAppointment, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default AppointmentHandler;
