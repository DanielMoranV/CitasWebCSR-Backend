"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Middleware para manejar errores de imágenes no encontradas
const handleImageNotFoundError = (req, res, next) => {
    const imagePath = path_1.default.join(__dirname, "../public/imgqrwp", req.url);
    console.log(imagePath);
    // Verificar si la imagen existe
    if (!fs_1.default.existsSync(imagePath)) {
        return res.status(404).send("Imagen no encontrada");
    }
    next(); // Pasar al siguiente middleware
};
// Aplicar el middleware antes de servir las imágenes estáticas
router.use("/", handleImageNotFoundError, express_2.default.static(path_1.default.join(__dirname, "../public/imgqrwp")));
exports.default = router;
