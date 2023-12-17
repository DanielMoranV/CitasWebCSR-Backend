"use strict";
// connection/whatsappweb.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWhatsAppClient = void 0;
const { Client } = require("whatsapp-web.js");
const qr_image_1 = __importDefault(require("qr-image"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createWhatsAppClient = () => {
    const client = new Client();
    const dir = path_1.default.join(__dirname, "/public/imgqrwp");
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
    client.on("qr", (qr) => {
        console.log(qr);
        console.log(dir);
        let qrSvg = qr_image_1.default.imageSync(qr, { type: "svg", margin: 4 });
        fs_1.default.writeFileSync(path_1.default.join(dir, "qr.svg"), qrSvg, "utf-8");
        console.log("⚡ Recuerda que el QR se actualiza cada minuto ⚡");
        console.log("⚡ Actualiza F5 el navegador para mantener el mejor QR ⚡");
    });
    client.on("ready", () => {
        console.log("¡El cliente está listo!");
    });
    client.on("message", (msg) => {
        if (msg.body === "!ping") {
            msg.reply("pong");
        }
    });
    return client;
};
exports.createWhatsAppClient = createWhatsAppClient;
