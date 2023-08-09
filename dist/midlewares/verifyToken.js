"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//eslint-disable-next-line
exports.default = (req, res, next) => {
    const token = req.headers["authorization"];
    const JWT_KEY = process.env.JWT_KEY;
    if (!token) {
        return res.status(403).send({
            message: "Se requiere un token de seguridad",
        });
    }
    jsonwebtoken_1.default.verify(token, JWT_KEY, (err) => {
        if (err) {
            return res.status(401).send({
                message: "Tu sesión ha expirado",
                token,
                JWT_KEY,
                err,
            });
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        if (decoded) {
            // Almacenar la información del usuario en req.user
            res.locals.user = decoded.username;
        }
        next();
    });
};
