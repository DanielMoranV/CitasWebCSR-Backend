import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { getInfoDoctors } from "../repository/DoctorsRepository";
import { success, failure } from "../utils/response";

class InfoDoctorsHandler {
  public async getInfoDoctors(_req: Request, res: Response): Promise<void> {
    try {
      const infoDoctors = await getInfoDoctors();
      if (infoDoctors.length != 0) {
        const message = "Operación exitosa Información de Médicos";
        success({ res, data: infoDoctors, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: infoDoctors, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default InfoDoctorsHandler;
