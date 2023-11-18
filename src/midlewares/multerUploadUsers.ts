import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, "../public/imgusers"),
  filename: (req, file, cb) => {
    const dni = Number(req.params.dni);
    const customFilename = dni;
    const extension = path.extname(file.originalname);
    cb(null, `${customFilename}${extension}`);
  },
});

const imageFilter = (req: any, file: any, cb: any) => {
  // Verifica si el archivo es una imagen (mime types que deseas permitir)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo debe ser una imagen válida."), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFilter,
}).single("profilePhoto");

export { uploadImage };
