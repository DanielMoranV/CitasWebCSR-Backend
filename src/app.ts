import http from "http";
import { Server } from "socket.io";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import prisma from "./connection/prisma";
import { createWhatsAppClient } from "./connection/whatsappweb";

// Whatsappweb
const client = createWhatsAppClient();
client.initialize();

//Routes
import { useRouter } from "./routes";

const app = express();
const api_url: string = <string>process.env.API;
const cli_origin: string = <string>process.env.CLIURL;

// Configurar la ruta principal para mostrar un mensaje de bienvenida con la lista de endpoints
app.get("/", (req, res) => {
  const welcomeMessage = `
    <h1>API CSR</h1>
    <p>Bienvenido a la documentación de la API CSR. Aquí se enumeran los endpoints disponibles:</p>
    
    <ul>
      <li><strong><a href="${api_url}/">GET ${api_url}/</a></strong>: Obtener información de la API</li>
    </ul>
  `;

  res.send(welcomeMessage);
});
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

// Crear un servidor HTTP y configurar Socket.io en él
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("Usuario conectado a través de Socket app.io");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Aquí puedes agregar lógica para escuchar eventos de Socket.io si es necesario
});

//Routes
try {
  useRouter(app, api_url);
} catch (error) {
  console.log(error);
} finally {
  prisma.instance.$disconnect();
}

export { app, server, io, client };
