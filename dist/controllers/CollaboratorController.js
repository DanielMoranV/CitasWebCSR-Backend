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
Object.defineProperty(exports, "__esModule", { value: true });
const errormessagebycode_1 = require("../midlewares/errormessagebycode");
const CollaboratorRepository_1 = require("../repository/CollaboratorRepository");
const response_1 = require("../utils/response");
// Datos de empleados
// --------------------------------
class CollaboratorHandler {
    // Lista de empleados
    getCollaborators(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collaborators = yield (0, CollaboratorRepository_1.getCollaborators)();
                if (collaborators.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: collaborators, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: collaborators, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo empleado
    createCollaborator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const newCollaborator = yield (0, CollaboratorRepository_1.createCollaborator)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newCollaborator, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Buscar empleado por Documento de identidad
    getCollaborator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const collaborator = yield (0, CollaboratorRepository_1.collaboratorBydni)(dni);
                if (collaborator) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: collaborator, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar datos de empleado (dni)
    updateCollaborator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const data = req.body;
                const collaborator = yield (0, CollaboratorRepository_1.updateCollaborator)(dni, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: collaborator, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Eliminar datos de empleado (dni)
    deleteCollaborator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const collaborator = yield (0, CollaboratorRepository_1.deleteCollaborator)(dni);
                const message = "Operación exitosa Registro Eliminado";
                // trabajar cuando no encuentra dni
                (0, response_1.success)({ res, data: collaborator, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = CollaboratorHandler;
