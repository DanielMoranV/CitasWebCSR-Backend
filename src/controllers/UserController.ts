import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  userBydni,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../repository/UserRepository";
import { success, failure } from "../utils/response";
import { accessBydni } from "../repository/AccessRepository";

// Datos de empleados
// --------------------------------

class UserHandler {
  // Lista de empleados
  public async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getUsers();
      if (users.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: users, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: users, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Crear nuevo empleado
  public async createUser(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newUser = await createUser(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newUser, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Buscar empleado por Documento de identidad
  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const user = await userBydni(dni);
      if (user) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: user, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar datos de empleado (dni)
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const data = req.body;
      const user = await updateUser(dni, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Eliminar datos de empleado (dni)
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const user = await deleteUser(dni);
      const message = "Operación exitosa Registro Eliminado";
      // trabajar cuando no encuentra dni
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async currentUser(req: Request, res: Response): Promise<void> {
    try {
      const username = res.locals.user;
      console.log(username);
      const user = await accessBydni(username);
      const message = "Sesión Actual";
      success({ res, data: user, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default UserHandler;
