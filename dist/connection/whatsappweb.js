"use strict";
// connection/whatsappweb.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWhatsAppClient = void 0;
const { Client } = require("whatsapp-web.js");
const qr_image_1 = __importDefault(require("qr-image"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_1 = require("../app");
const QRCodeTerminal = __importStar(require("qrcode-terminal"));
const createWhatsAppClient = () => {
    const client = new Client();
    const dir = path_1.default.join(__dirname, "../public/imgqrwp");
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
    client.on("qr", (qr) => {
        // Genera una representación del código QR en la consola
        QRCodeTerminal.generate(qr, { small: true });
        let qrSvg = qr_image_1.default.imageSync(qr, { type: "svg", margin: 4 });
        fs_1.default.writeFileSync(path_1.default.join(dir, "qr.svg"), qrSvg, "utf-8");
        console.log("⚡ Recuerda que el QR se actualiza cada minuto ⚡");
        app_1.io.emit("newQr", qr);
        console.log("Qr io emitido");
    });
    client.on("ready", () => {
        console.log(`🔥 WhatsApp Web API ready!`);
        let wpReady = true;
        app_1.io.emit("wpReady", wpReady);
    });
    client.on("message", (msg) => {
        if (msg.body === "!ping") {
            msg.reply("pong");
        }
    });
    return client;
};
exports.createWhatsAppClient = createWhatsAppClient;
