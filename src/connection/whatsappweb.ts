// connection/whatsappweb.ts

const { Client } = require("whatsapp-web.js");
import qrImage from "qr-image";
import fs from "fs";
import path from "path";
import { io } from "../app";
import * as QRCodeTerminal from "qrcode-terminal";

const createWhatsAppClient = () => {
  const client = new Client();

  const dir = path.join(__dirname, "../public/imgqrwp");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  client.on("qr", (qr: any) => {
    // Genera una representación del código QR en la consola
    QRCodeTerminal.generate(qr, { small: true });

    let qrSvg = qrImage.imageSync(qr, { type: "svg", margin: 4 });
    fs.writeFileSync(path.join(dir, "qr.svg"), qrSvg, "utf-8");
    console.log("⚡ Recuerda que el QR se actualiza cada minuto ⚡");
    io.emit("newQr", qr);
    console.log("Qr io emitido");
  });

  client.on("ready", () => {
    console.log(`🔥 WhatsApp Web API ready!`);
    let wpReady = true;
    io.emit("wpReady", wpReady);
  });

  client.on(
    "message",
    (msg: { body: string; reply: (arg0: string) => void }) => {
      if (msg.body === "!ping") {
        msg.reply("pong");
      }
    }
  );

  return client;
};

export { createWhatsAppClient };
