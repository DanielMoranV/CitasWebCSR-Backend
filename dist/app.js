"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./connection/prisma"));
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
