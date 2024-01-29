"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errormessagebycode_1 = require("../midlewares/errormessagebycode");
const response_1 = require("../utils/response");
const PaymentRepository_1 = require("../repository/PaymentRepository");
const ConnectionRepository_1 = require("../repository/ConnectionRepository");
const culqi_node_1 = __importDefault(require("culqi-node"));
const { Message } = require("whatsapp-web.js");
const accessToken = process.env.ACCESS_TOKEN_CULQUI;
const culqi = new culqi_node_1.default({
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
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                //const chargeCreated = await createCharge(data);
                const chargeCreated = true;
                const msgwp = `¡Cita médica reservada con éxito en Clínica Santa Rosa! 🏥📅\n\n` +
                    `Paciente: *${data.dataPayment.patient}*\n` +
                    `Médico: *${data.dataPayment.nameDoctor}*\n` +
                    `Especialidad: *${data.dataPayment.specialty}*\n` +
                    `Horario: *${data.dataPayment.date}*\n` +
                    `Costo: *S/.${data.dataPayment.price}*\n` +
                    `Call Center: *985 586 350*\n` +
                    `Dirección de la clínica: *Av. Panamericana N° 332 - Urb. Santa Rosa, Sullana*\n\n` +
                    `Gracias por confiar en nosotros. ¡Te esperamos!`;
                if (chargeCreated) {
                    yield (0, ConnectionRepository_1.sendMessageWp)(data.client.phone, msgwp);
                    // if (await isConnectionAvailable()) {
                    //   await sendMessageWp(data.client.phone, msgwp);
                    // } else {
                    //   console.log("Inicie sesion wp");
                    // }
                    //const formattedNumber = `+51${data.client.phone}`;
                    //await sendSMS(formattedNumber, msgwp);
                    console.log("mensaje wp enviado");
                    const newPayment = yield (0, PaymentRepository_1.createPayment)(data.metadata);
                    const message = "Operación exitosa Registro Creado";
                    (0, response_1.success)({ res, data: newPayment, message });
                    // Otros pasos, como enviar mensajes de WhatsApp, si es necesario
                }
                else {
                    // Manejar el caso en que el cargo no se creó correctamente
                    (0, response_1.failure)({ res, message: "Error en la creación del cargo." });
                }
            }
            catch (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    // Manejar el error específico de Culqi
                    const errorMessage = error.response.data.user_message || "Error en la solicitud.";
                    (0, response_1.failure)({ res, message: errorMessage });
                }
                else {
                    (0, response_1.failure)({
                        res,
                        message: "Error en la comunicación con el servidor externo.",
                    });
                }
            }
        });
    }
    createPaymentCash(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const newPayment = yield (0, PaymentRepository_1.createPaymentCash)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newPayment, message });
            }
            catch (error) {
                console.log(error);
                if (error.code) {
                    const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                    (0, response_1.failure)({ res, message });
                }
                else {
                    const message = error.user_message;
                    console.log(message);
                    (0, response_1.failure)({ res, message });
                }
            }
        });
    }
    getLastPayment(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield (0, PaymentRepository_1.getLastPayment)();
                const message = "Operación exitosa Lista de Pagos";
                (0, response_1.success)({ res, data: payment, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = PaymentHandler;
