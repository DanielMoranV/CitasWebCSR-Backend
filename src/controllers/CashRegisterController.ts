import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  createCashRegister,
  getCashRegisterId,
  getCashRegisters,
  updateCashRegister,
  getTodayCashRegisterForAdmissionist,
  getCashRegisterForAdmissionist,
  getPreviousCashRegisterForAdmissionist,
  createCashRegisterTransaction,
  sumIngressAmountByCashRegisterId,
  getByDateCashRegister,
} from "../repository/CashRegisterRepository";
import { success, failure } from "../utils/response";

class CashRegisterHandler {
  public async createCashRegister(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      data.createAt = new Date();
      const newCollaborator = await createCashRegister(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newCollaborator, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async createCashRegisterTransaction(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = req.body;
    try {
      const newCollaborator = await createCashRegisterTransaction(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newCollaborator, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getCashRegisters(_req: Request, res: Response): Promise<void> {
    try {
      const cashRegisters = await getCashRegisters();
      if (cashRegisters.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: cashRegisters, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: cashRegisters, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getcashRegister(req: Request, res: Response): Promise<void> {
    try {
      const cashRegisterId = Number(req.params.cashRegisterId);
      const cashRegister = await getCashRegisterId(cashRegisterId);
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async sumIngressAmountByCashRegisterId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const cashRegisterId = Number(req.params.cashRegisterId);
      console.log(cashRegisterId);
      const cashRegister = await sumIngressAmountByCashRegisterId(
        cashRegisterId
      );
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
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
  public async getTodayCashRegisterForAdmissionist(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const admissionistId = Number(req.params.admissionistId);
      const cashRegister = await getTodayCashRegisterForAdmissionist(
        admissionistId
      );
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getByDateCashRegister(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const date = new Date(req.params.date);
      console.log(date);
      const cashRegister = await getByDateCashRegister(date);
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
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
  public async getPreviousCashRegisterForAdmissionist(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const admissionistId = Number(req.params.admissionistId);
      const cashRegister = await getPreviousCashRegisterForAdmissionist(
        admissionistId
      );
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getCashRegisterForAdmissionist(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const admissionistId = Number(req.params.admissionistId);
      const cashRegister = await getCashRegisterForAdmissionist(admissionistId);
      if (cashRegister) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: cashRegister, message });
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
  public async updateCashRegister(req: Request, res: Response): Promise<void> {
    try {
      const cashRegisterId = Number(req.params.cashRegisterId);
      const data = req.body;
      const cashRegister = await updateCashRegister(cashRegisterId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: cashRegister, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default CashRegisterHandler;
