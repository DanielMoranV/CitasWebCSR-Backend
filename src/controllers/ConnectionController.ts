import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  isConnectionAvailable,
  sendMessageWp,
} from "../repository/ConnectionRepository";
import { success, failure } from "../utils/response";

class ConnectionHandler {
  public async isConnectionAvailableWp(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const phone = "948860381";
      const messageWp = "prueba de conexion";
      const isConnection = await sendMessageWp(phone, messageWp);
      console.log(isConnection);
      const message = "Operación exitosa sesión de wp: " + isConnection;
      success({ res, data: isConnection, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default ConnectionHandler;
