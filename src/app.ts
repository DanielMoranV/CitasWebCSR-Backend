import express from "express";
import morgan from "morgan";
import cors from "cors";
import prisma from "./connection/prisma";

const { Client } = require("whatsapp-web.js");
const qrImage = require("qr-image");
const fs = require("fs");
const path = require("path");

const client = new Client();

const dir = path.join(process.cwd(), "tmp");

// Verificar si el directorio existe, si no, crearlo
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

client.on("qr", (qr: any) => {
  console.log(qr);
  let qrSvg = qrImage.imageSync(qr, { type: "svg", margin: 4 });
  fs.writeFileSync(path.join(dir, "qr.svg"), qrSvg, "utf-8");
  console.log("⚡ Recuerda que el QR se actualiza cada minuto ⚡");
  console.log("⚡ Actualiza F5 el navegador para mantener el mejor QR ⚡");
});

client.on("ready", () => {
  console.log("¡El cliente está listo!");
});

client.on("message", (msg: { body: string; reply: (arg0: string) => void }) => {
  if (msg.body === "!ping") {
    msg.reply("pong");
  }
});
export { client };
client.initialize();

//Routes
import { useRouter } from "./routes";

const app = express();
const api_url: string = <string>process.env.API;
const cli_origin: string = <string>process.env.CLIURL;

//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: cli_origin, // Cambiar a la URL permitida para las solicitudes
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use(cors(corsOptions));

//Routes
try {
  useRouter(app, api_url);
} catch (error) {
  console.log(error);
} finally {
  prisma.instance.$disconnect();
}

export default app;
