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
exports.sendMessageWp = exports.isConnectionAvailable = exports.updateAvailableConnection = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const app_1 = require("../app");
function updateAvailableConnection(connectionId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("holi actualizando");
        return yield prisma_1.default.instance.connection.update({
            where: { connectionId },
            data,
        });
    });
}
exports.updateAvailableConnection = updateAvailableConnection;
// export async function isConnectionAvailable(
//   connectionId: number
// ): Promise<any> {
//   console.log("holi consultando");
//   // Consulta el estado de la conexión en la base de datos
//   const connection = await prisma.instance.connection.findUnique({
//     where: { connectionId },
//     select: { available: true },
//   });
//   console.log("prisma", connection);
//   // Devuelve true si la conexión está disponible, de lo contrario, false
//   return connection?.available;
// }
function isConnectionAvailable() {
    return __awaiter(this, void 0, void 0, function* () {
        return app_1.client.session ? true : false;
    });
}
exports.isConnectionAvailable = isConnectionAvailable;
function sendMessageWp(phone, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formattedNumber = `51${phone}`;
            // Enviar el mensaje
            const chat = yield app_1.client.getChatById(formattedNumber + "@c.us");
            yield chat.sendMessage(message);
            console.log("Mensaje enviado correctamente");
            return true;
        }
        catch (error) {
            console.error("Error al enviar el mensaje de WhatsApp:", error);
            return false;
        }
    });
}
exports.sendMessageWp = sendMessageWp;
