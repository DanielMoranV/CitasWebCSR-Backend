import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
export async function deleteToken(
  res: Response,
  req: Request,
  next: NextFunction
): Promise<any> {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "Se requiere un token de seguridad",
    });
  }
  res.clearCookie(token);
  next();
}
