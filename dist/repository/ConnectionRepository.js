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
        return yield prisma_1.default.instance.connection.update({
            where: { connectionId },
            data,
        });
    });
}
exports.updateAvailableConnection = updateAvailableConnection;
function isConnectionAvailable(connectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Consulta el estado de la conexión en la base de datos
            const connection = yield prisma_1.default.instance.connection.findUnique({
                where: { connectionId },
            });
            // Devuelve true si la conexión está disponible, de lo contrario, false
            return (connection === null || connection === void 0 ? void 0 : connection.available) || false;
        }
        catch (error) {
            console.error("Error al consultar el estado de la conexión:", error);
            return false; // En caso de error, asume que la conexión no está disponible
        }
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
