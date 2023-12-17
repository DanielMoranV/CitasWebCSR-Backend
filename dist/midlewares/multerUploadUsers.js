"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imageStorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../public/imgusers"),
    filename: (req, file, cb) => {
        const dni = Number(req.params.dni);
        const customFilename = dni;
        const extension = path_1.default.extname(file.originalname);
        cb(null, `${customFilename}${extension}`);
    },
});
const imageFilter = (req, file, cb) => {
    // Verifica si el archivo es una imagen (mime types que deseas permitir)
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("El archivo debe ser una imagen válida."), false);
    }
};
const uploadImage = (0, multer_1.default)({
    storage: imageStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: imageFilter,
}).single("profilePhoto");
exports.uploadImage = uploadImage;
