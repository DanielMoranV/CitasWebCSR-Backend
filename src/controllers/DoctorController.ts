import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { getDoctors } from "../repository/DoctorsRepository";
import { success, failure } from "../utils/response";

class DoctorsHandler {
  public async getDoctors(_req: Request, res: Response): Promise<void> {
    try {
      const doctors = await getDoctors();
      if (doctors.length != 0) {
        const message = "Operación exitosa Información de Médicos";
        success({ res, data: doctors, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: doctors, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  //   public async getInfoDoctor(req: Request, res: Response): Promise<void> {
  //     try {
  //       const cmp = req.params.cmp;
  //       const infoDoctor = await getInfoDoctor(cmp);
  //       console.log(cmp);
  //       if (infoDoctor.length != 0) {
  //         const message = "Operación exitosa Información de Médicos";
  //         success({ res, data: infoDoctor, message });
  //       } else {
  //         const message = "Operación exitosa sin registros";
  //         success({ res, data: infoDoctor, message });
  //       }
  //     } catch (error: any) {
  //       const message = getErrorMessageByCode(error.code);
  //       failure({ res, message });
  //     }
  //   }
}

export default DoctorsHandler;
