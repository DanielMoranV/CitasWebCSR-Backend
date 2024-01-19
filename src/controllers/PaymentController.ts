import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { sendSMS } from "../connection/twilioService";
import { success, failure } from "../utils/response";
import {
  createCharge,
  createPayment,
  createPaymentCash,
  getLastPayment,
} from "../repository/PaymentRepository";
import { updateTimeSlot } from "../repository/DoctorsRepository";
import {
  sendMessageWp,
  isConnectionAvailable,
} from "../repository/ConnectionRepository";
import Culqi from "culqi-node";
const { Message } = require("whatsapp-web.js");
import { client } from "../app";

const accessToken: string = <string>process.env.ACCESS_TOKEN_CULQUI;
const culqi = new Culqi({
  privateKey: accessToken,
});
class PaymentHandler {
  // public async createPayment(req: Request, res: Response): Promise<void> {
  //   const data = req.body;
  //   try {
  //     const charge = await culqi.charges.createCharge({
  //       amount: data.metadata.amount,
  //       currency_code: "PEN",
  //       email: data.email,
  //       source_id: data.id,
  //       antifraud_details: {
  //         address: data.client.address,
  //         address_city: "Piura",
  //         country_code: "PE",
  //         first_name: data.client.name,
  //         last_name: data.client.surnames,
  //         phone: data.client.phone,
  //       },
  //     });
  //     console.log("cargo:", charge);
  //     if (charge.id) {
  //       data.metadata.chargeId = charge.id;
  //       const newPayment = await createPayment(data.metadata);
  //       const message = "Operación exitosa Registro Creado";
  //       success({ res, data: newPayment, message });

  //       // enviar un mensaje de a data.client.phone
  //       const msgwp =
  //         `¡Cita médica reservada con éxito en Clínica Santa Rosa! 🏥📅\n\n` +
  //         `Paciente: *${data.dataPayment.patient}*\n` +
  //         `Médico: *${data.dataPayment.nameDoctor}*\n` +
  //         `Especialidad: *${data.dataPayment.specialty}*\n` +
  //         `Horario: *${data.dataPayment.date}*\n` +
  //         `Costo: *S/.${data.dataPayment.price}*\n` +
  //         `Call Center: *985 586 350*\n` +
  //         `Dirección de la clínica: *Av. Panamericana N° 332 - Urb. Santa Rosa, Sullana*\n\n` +
  //         `Gracias por confiar en nosotros. ¡Te esperamos!`;
  //       const formattedNumber = `51${data.client.phone}`;
  //       // Enviar el mensaje
  //       const chat = await client.getChatById(formattedNumber + "@c.us"); // Obtener el chat por el número de teléfono
  //       await chat.sendMessage(msgwp); // Enviar el mensaje
  //       console.log("Mensaje enviado correctamente");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     if (error.code) {
  //       const message = getErrorMessageByCode(error.code);
  //       failure({ res, message });
  //     } else {
  //       const message = error.user_message;
  //       console.log(message);
  //       failure({ res, message });
  //     }
  //   }
  // }
  public async createPayment(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      //const chargeCreated = await createCharge(data);
      const chargeCreated = true;
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

      if (chargeCreated) {
        await sendMessageWp(data.client.phone, msgwp);
        // if (await isConnectionAvailable()) {
        //   await sendMessageWp(data.client.phone, msgwp);
        // } else {
        //   console.log("Inicie sesion wp");
        // }
        const formattedNumber = `+51${data.client.phone}`;
        await sendSMS(formattedNumber, msgwp);
        const newPayment = await createPayment(data.metadata);
        const message = "Operación exitosa Registro Creado";
        success({ res, data: newPayment, message });

        // Otros pasos, como enviar mensajes de WhatsApp, si es necesario
      } else {
        // Manejar el caso en que el cargo no se creó correctamente
        failure({ res, message: "Error en la creación del cargo." });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        // Manejar el error específico de Culqi
        const errorMessage =
          error.response.data.user_message || "Error en la solicitud.";
        failure({ res, message: errorMessage });
      } else {
        failure({
          res,
          message: "Error en la comunicación con el servidor externo.",
        });
      }
    }
  }
  public async createPaymentCash(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newPayment = await createPaymentCash(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newPayment, message });
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
  public async getLastPayment(_req: Request, res: Response): Promise<void> {
    try {
      const payment = await getLastPayment();
      const message = "Operación exitosa Lista de Pagos";
      success({ res, data: payment, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default PaymentHandler;
