"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.io = exports.server = exports.app = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./connection/prisma"));
const whatsappweb_1 = require("./connection/whatsappweb");
const path_1 = __importDefault(require("path"));
//Whatsappweb;
const client = (0, whatsappweb_1.createWhatsAppClient)();
exports.client = client;
client.initialize();
//Routes
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
const api_url = process.env.API;
const cli_origin = process.env.CLIURL;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
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
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Configurar CORS
const corsOptions = {
    origin: cli_origin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use((0, cors_1.default)(corsOptions));
// Crear un servidor HTTP y configurar Socket.io en él
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, { cors: corsOptions });
exports.io = io;
io.on("connection", (socket) => {
    console.log("Usuario conectado a través de Socket app.io");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    // Aquí puedes agregar lógica para escuchar eventos de Socket.io si es necesario
});
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
