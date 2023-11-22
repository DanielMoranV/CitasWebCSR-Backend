import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { hashPassword } from "../utils/strings";
import { uploadImage } from "../midlewares/multerUploadUsers";
import {
  userBydni,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  createDependent,
  userBydniDependent,
  updateUserDependent,
  deleteUserDependent,
  getPatients,
} from "../repository/UserRepository";
import { success, failure } from "../utils/response";
import { accessBydni, createAccessUser } from "../repository/AccessRepository";

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
      data.access.password = await hashPassword(data.access.password);
      const newUser = await createUser(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newUser, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Crear nuevo dependiente
  public async createDependent(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const user = await userBydni(data.dni);
      if (user) {
        const message = "Usuario ya existe";
        console.log(message);
        failure({ res, message });
      } else {
        const newUser = await createDependent(data);
        const message = "Operación exitosa Registro Creado";
        success({ res, data: newUser, message });
      }
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  // Buscar dependientes por Documento de identidad del usuario
  public async getUserDependent(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.userdni;
      const user = await userBydniDependent(dni);
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
  // Lista de pacientes y dependientes
  public async getPatients(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getPatients();
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
  // Actualizar datos de empleado (dni)
  public async updateUserDependent(req: Request, res: Response): Promise<void> {
    try {
      const dependentId = Number(req.params.dependentId);
      const data = req.body;
      const userDependent = await updateUserDependent(dependentId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: userDependent, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async deleteUserDependent(req: Request, res: Response): Promise<void> {
    try {
      const dependentId = Number(req.params.dependentId);
      const userDependent = await deleteUserDependent(dependentId);
      const message = "Operación exitosa Registro Eliminado";
      // trabajar cuando no encuentra dni
      success({ res, data: userDependent, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  // Crear nuevo paciente con accesos
  public async createPatient(req: Request, res: Response): Promise<void> {
    const dataPatients = req.body;
    const username = req.body.dni;
    const password = await hashPassword(username);

    try {
      console.log(dataPatients);
      dataPatients.access = {
        username,
        password,
        roleId: 4,
      };
      const newUser = await createUser(dataPatients);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newUser, message });
    } catch (error: any) {
      console.log(error);
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
        const message = "Operación exitosa No se encontraron resultadosxd";
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
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async updatePhotoProfile(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      // Esperar a que la imagen se cargue antes de continuar
      await new Promise<void>((resolve, reject) => {
        uploadImage(req, res, (err) => {
          if (err) {
            err.message = "Archivo no permitido";

            return reject(err);
          }
          resolve();
        });
      });

      // Verificación de Archivos Subidos
      if (!req.file) {
        res.status(400).json({ error: "No se subió ninguna imagen" });
        return;
      }
      console.log(req.file);
      const uploadedFileData = {
        photo: req.file.filename,
      };
      console.log(uploadedFileData);
      const profilePhoto = await updateUser(dni, uploadedFileData);

      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: profilePhoto, message });
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
      const username = req.params.dni;
      const user = await accessBydni(username);
      const message = "Sesión Actual";
      console.log("holiwi", username);
      success({ res, data: user, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default UserHandler;
