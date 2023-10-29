import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import { createPayment } from "../repository/PaymentRepository";
import { updateTimeSlot } from "../repository/DoctorsRepository";
import Culqi from "culqi-node";
const { Message } = require("whatsapp-web.js");
import { client } from "../app";

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
      console.log("cargo:", charge);
      if (charge.id) {
        data.metadata.chargeId = charge.id;
        const newPayment = await createPayment(data.metadata);
        const message = "Operación exitosa Registro Creado";
        success({ res, data: newPayment, message });

        // enviar un mensaje de a data.client.phone
        const msgwp =
          `¡Cita médica reservada con éxito en Clínica Santa Rosa! 🏥📅\n\n` +
          `Paciente: *${data.dataPayment.patient}*\n` +
          `Médico: *${data.dataPayment.nameDoctor}*\n` +
          `Especialidad: *${data.dataPayment.specialty}*\n` +
          `Horario: *${data.dataPayment.date}*\n` +
          `Costo: *S/.${data.dataPayment.price}*\n` +
          `Call Center: *985 586 350*\n` +
          `Dirección de la clínica: *Av. Panamericana N° 332 - Urb. Santa Rosa, Sullana*\n\n` +
          `Gracias por confiar en nosotros. ¡Te esperamos!`;
        const formattedNumber = `51${data.client.phone}`;
        // Enviar el mensaje
        const chat = await client.getChatById(formattedNumber + "@c.us"); // Obtener el chat por el número de teléfono
        await chat.sendMessage(msgwp); // Enviar el mensaje
        console.log("Mensaje enviado correctamente");
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
  // public async getPaymentId(req: Request, res: Response): Promise<void> {
  //   try {
  //     const appointmentId = Number(req.params.appointmentId);
  //     const appointment = await getPaymentId(appointmentId);
  //     const message = "Operación exitosa Lista de empleados";
  //     success({ res, data: appointment, message });
  //   } catch (error: any) {
  //     const message = getErrorMessageByCode(error.code);
  //     failure({ res, message });
  //   }
  // }
}

export default PaymentHandler;
