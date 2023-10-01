import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  getDoctorSchedule,
  getDoctors,
  updateDoctor,
  updatePersonalizedPrice,
  createDoctorSchedule,
} from "../repository/DoctorsRepository";
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
  public async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = Number(req.params.doctorId);
      const data = req.body;
      const doctor = await updateDoctor(doctorId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: doctor, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async updatePersonalizedPrice(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const personalizedPriceId = Number(req.params.personalizedPriceId);
      const data = req.body;
      const personalizedPrice = await updatePersonalizedPrice(
        personalizedPriceId,
        data
      );
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: personalizedPrice, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getDoctorSchedule(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = Number(req.params.doctorId);
      const doctor = await getDoctorSchedule(doctorId);
      if (doctor) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: doctor, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async createDoctorSchedule(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const doctor = await createDoctorSchedule(data);
      if (doctor) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: doctor, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      console.log(error);
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
