import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import { createPayment, getPaymentId } from "../repository/PaymentRepository";
import { updateTimeSlot } from "../repository/DoctorsRepository";
import Culqi from "culqi-node";

const accessToken: string = <string>process.env.ACCESS_TOKEN_CULQUI;
const culqi = new Culqi({
  privateKey: accessToken,
});
class PaymentHandler {
  public async createPayment(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const charge = await culqi.charges.createCharge({
        amount: data.metadata.amount,
        currency_code: "PEN",
        email: data.email,
        source_id: data.id,
        antifraud_details: {
          address: data.client.address,
          address_city: data.client.address,
          country_code: "PE",
          first_name: data.client.name,
          last_name: data.client.surnames,
          phone: data.client.phone,
        },
      });
      if (charge.id) {
        data.metadata.chargeId = charge.id;
        const newPayment = await createPayment(data.metadata);
        const message = "Operación exitosa Registro Creado";
        success({ res, data: newPayment, message });
      }
    } catch (error: any) {
      console.log(error);
      if (error.code) {
        const message = getErrorMessageByCode(error.code);
        failure({ res, message });
      } else {
        const message = error.user_message;
        console.log(message);
        failure({ res, message });
      }
    }
  }
  public async getPaymentId(req: Request, res: Response): Promise<void> {
    try {
      const appointmentId = Number(req.params.appointmentId);
      const appointment = await getPaymentId(appointmentId);
      const message = "Operación exitosa Lista de empleados";
      success({ res, data: appointment, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default PaymentHandler;
