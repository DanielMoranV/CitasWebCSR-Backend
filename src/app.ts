import express from "express";
import morgan from "morgan";
import cors from "cors";
import prisma from "./connection/prisma";
import { Payment } from "mercadopago";

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
