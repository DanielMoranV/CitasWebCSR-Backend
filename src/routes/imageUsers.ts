// imagenQrWhatsapp.ts
import { Router } from "express";
import express from "express";
import path from "path";
import fs from "fs";

const router = Router();

// Middleware para manejar errores de imágenes no encontradas
const handleImageNotFoundError = (req: any, res: any, next: any) => {
  const imagePath = path.join(
    __dirname,
    "../public/imgusers",
    req.params.nameimg
  );

  // Verificar si la imagen existe
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Imagen no encontrada");
  }

  next(); // Pasar al siguiente middleware
};

// Ruta para generar la URL dinámica del código QR
router.get(
  "/photoprofile/:nameimg",
  handleImageNotFoundError,
  async (req, res) => {
    try {
      const dynamicURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/imgusers/photoprofile/image/${
        req.params.nameimg
      }/${Date.now()}`;

      res.json({ url: dynamicURL });
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  }
);

// Ruta para servir la imagen QR dinámica
router.get(
  "/photoprofile/image/:nameimg/:timestamp",
  handleImageNotFoundError,
  (req, res) => {
    const imagePath = path.join(
      __dirname,
      "../public/imgusers",
      req.params.nameimg
    );
    res.sendFile(imagePath);
  }
);

export default router;
