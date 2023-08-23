import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { hashPassword } from "../utils/strings";
import {
  collaboratorBydni,
  createCollaborator,
  getCollaborators,
  updateCollaborator,
  deleteCollaborator,
} from "../repository/CollaboratorRepository";
import { success, failure } from "../utils/response";

// Datos de empleados
// --------------------------------

class CollaboratorHandler {
  // Lista de empleados
  public async getCollaborators(_req: Request, res: Response): Promise<void> {
    try {
      const collaborators = await getCollaborators();
      if (collaborators.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: collaborators, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: collaborators, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Crear nuevo empleado
  public async createCollaborator(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newCollaborator = await createCollaborator(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newCollaborator, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Buscar empleado por Documento de identidad
  public async getCollaborator(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const collaborator = await collaboratorBydni(dni);
      if (collaborator) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: collaborator, message });
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
  public async updateCollaborator(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const data = req.body;
      const collaborator = await updateCollaborator(dni, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: collaborator, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Eliminar datos de empleado (dni)
  public async deleteCollaborator(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const collaborator = await deleteCollaborator(dni);
      const message = "Operación exitosa Registro Eliminado";
      // trabajar cuando no encuentra dni
      success({ res, data: collaborator, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default CollaboratorHandler;
