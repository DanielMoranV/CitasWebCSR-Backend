import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import { createPayment, getPaymentId } from "../repository/PaymentRepository";
import { updateTimeSlot } from "../repository/DoctorsRepository";
import { MercadoPagoConfig, Payment } from "mercadopago";

class PaymentHandler {
  public async createPayment(req: Request, res: Response): Promise<void> {
    const data = req.body;

    const accessToken: string = <string>process.env.ACCESS_TOKEN_MP;
    const client = new MercadoPagoConfig({
      accessToken,
      options: {
        timeout: 5000,
        idempotencyKey: "abc",
      },
    });

    const payment = new Payment(client);
    console.log(data);
    try {
      const body = {
        transaction_amount: data.transaction_amount,
        token: data.token,
        installments: data.installments,
        issuer_id: data.issuer_id,
        payment_method_id: data.payment_method_id,
        payer: data.payer,
      };

      // Step 5: Make the request
      payment.create({ body }).then(console.log).catch(console.log);
      //const newPayment = await createPayment(data);
      const message = "Operación exitosa Registro Creado";
      //success({ res, data: newPayment, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
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
