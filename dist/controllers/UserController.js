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
const strings_1 = require("../utils/strings");
const multerUploadUsers_1 = require("../midlewares/multerUploadUsers");
const UserRepository_1 = require("../repository/UserRepository");
const response_1 = require("../utils/response");
const AccessRepository_1 = require("../repository/AccessRepository");
// Datos de empleados
// --------------------------------
class UserHandler {
    // Lista de empleados
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, UserRepository_1.getUsers)();
                if (users.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: users, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: users, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo empleado
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                data.access.password = yield (0, strings_1.hashPassword)(data.access.password);
                const newUser = yield (0, UserRepository_1.createUser)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newUser, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo dependiente
    createDependent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const user = yield (0, UserRepository_1.userBydni)(data.dni);
                if (user) {
                    const message = "Usuario ya existe";
                    console.log(message);
                    (0, response_1.failure)({ res, message });
                }
                else {
                    const newUser = yield (0, UserRepository_1.createDependent)(data);
                    const message = "Operación exitosa Registro Creado";
                    (0, response_1.success)({ res, data: newUser, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Buscar dependientes por Documento de identidad del usuario
    getUserDependent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.userdni;
                const user = yield (0, UserRepository_1.userBydniDependent)(dni);
                if (user) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: user, message });
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
    // Lista de pacientes y dependientes
    getPatients(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, UserRepository_1.getPatients)();
                if (users.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: users, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: users, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                console.log(error);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    searchbydni(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const user = yield (0, UserRepository_1.searchbydni)(dni);
                if (user.dni == "") {
                    (0, response_1.failure)({ res, message: "DNI no encontrado" });
                    return;
                }
                const message = "Operación exitosa Registro Encontrado";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = error;
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar datos de empleado (dni)
    updateUserDependent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependentId = Number(req.params.dependentId);
                const data = req.body;
                const userDependent = yield (0, UserRepository_1.updateUserDependent)(dependentId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: userDependent, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    deleteUserDependent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependentId = Number(req.params.dependentId);
                const userDependent = yield (0, UserRepository_1.deleteUserDependent)(dependentId);
                const message = "Operación exitosa Registro Eliminado";
                // trabajar cuando no encuentra dni
                (0, response_1.success)({ res, data: userDependent, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo paciente con accesos
    createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPatients = req.body;
            const username = req.body.dni;
            const password = yield (0, strings_1.hashPassword)(username);
            try {
                console.log(dataPatients);
                dataPatients.access = {
                    username,
                    password,
                    roleId: 4,
                };
                const newUser = yield (0, UserRepository_1.createUser)(dataPatients);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newUser, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message: "post" + message });
            }
        });
    }
    // Buscar empleado por Documento de identidad
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const user = yield (0, UserRepository_1.userBydni)(dni);
                if (user) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: user, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultadosxd";
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const data = req.body;
                const user = yield (0, UserRepository_1.updateUser)(dni, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updatePhotoProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                // Esperar a que la imagen se cargue antes de continuar
                yield new Promise((resolve, reject) => {
                    (0, multerUploadUsers_1.uploadImage)(req, res, (err) => {
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
                const profilePhoto = yield (0, UserRepository_1.updateUser)(dni, uploadedFileData);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: profilePhoto, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Eliminar datos de empleado (dni)
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const user = yield (0, UserRepository_1.deleteUser)(dni);
                const message = "Operación exitosa Registro Eliminado";
                // trabajar cuando no encuentra dni
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    currentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.dni;
                const user = yield (0, AccessRepository_1.accessBydni)(username);
                const message = "Sesión Actual";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = UserHandler;
