"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./connection/prisma"));
const { Client } = require("whatsapp-web.js");
const qrImage = require("qr-image");
const fs = require("fs");
const path = require("path");
const client = new Client();
exports.client = client;
const dir = path.join(process.cwd(), "tmp");
// Verificar si el directorio existe, si no, crearlo
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
client.on("qr", (qr) => {
    console.log(qr);
    let qrSvg = qrImage.imageSync(qr, { type: "svg", margin: 4 });
    fs.writeFileSync(path.join(dir, "qr.svg"), qrSvg, "utf-8");
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
client.initialize();
//Routes
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const api_url = process.env.API;
const cli_origin = process.env.CLIURL;
//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
//Middleware
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Configurar CORS
const corsOptions = {
    origin: cli_origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use((0, cors_1.default)(corsOptions));
//Routes
try {
    (0, routes_1.useRouter)(app, api_url);
}
catch (error) {
    console.log(error);
}
finally {
    prisma_1.default.instance.$disconnect();
}
exports.default = app;
