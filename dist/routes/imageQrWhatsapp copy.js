"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imagenQrWhatsapp.ts
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Middleware para manejar errores de imágenes no encontradas
const handleImageNotFoundError = (req, res, next) => {
    const imagePath = path_1.default.join(__dirname, "../public/imgqrwp", req.params.nameimg);
    // Verificar si la imagen existe
    if (!fs_1.default.existsSync(imagePath)) {
        return res.status(404).send("Imagen no encontrada");
    }
    next(); // Pasar al siguiente middleware
};
// Ruta para generar la URL dinámica del código QR
router.get("/urlqr/:nameimg", handleImageNotFoundError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dynamicURL = `${req.protocol}://${req.get("host")}/api/v1/imgqrwp/urlqr/image/${req.params.nameimg}/${Date.now()}`;
        res.json({ url: dynamicURL });
    }
    catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}));
// Ruta para servir la imagen QR dinámica
router.get("/urlqr/image/:nameimg/:timestamp", handleImageNotFoundError, (req, res) => {
    const imagePath = path_1.default.join(__dirname, "../public/imgqrwp", req.params.nameimg);
    res.sendFile(imagePath);
});
exports.default = router;
