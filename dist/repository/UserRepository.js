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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createDependent = exports.createUser = exports.deleteUserDependent = exports.updateUserDependent = exports.getPatients = exports.userBydniDependent = exports.userBydni = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
//import puppeteer from "puppeteer";
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findMany({
            orderBy: {
                userId: "asc",
            },
            include: {
                access: true,
            },
        });
    });
}
exports.getUsers = getUsers;
function userBydni(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findFirst({
            where: { dni },
            include: {
                access: true,
            },
        });
    });
}
exports.userBydni = userBydni;
function userBydniDependent(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findFirst({
            where: { dni },
            include: {
                dependents: true,
            },
        });
    });
}
exports.userBydniDependent = userBydniDependent;
function getPatients() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.findMany({
            where: {
                roleId: 4,
                active: true,
            },
            orderBy: {
                user: {
                    surnames: "asc", // Ordenar por apellidos en orden ascendente
                },
            },
            select: {
                accessId: true,
                user: {
                    include: {
                        dependents: true,
                    },
                },
            },
        });
    });
}
exports.getPatients = getPatients;
function updateUserDependent(dependentId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dependent = yield prisma_1.default.instance.dependent.update({
            where: { dependentId },
            data,
        });
        return dependent;
    });
}
exports.updateUserDependent = updateUserDependent;
function deleteUserDependent(dependentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield prisma_1.default.instance.dependent.delete({
            where: {
                dependentId,
            },
        });
        return deletedUser;
    });
}
exports.deleteUserDependent = deleteUserDependent;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (data.Doctor) {
            const newUser = yield prisma_1.default.instance.user.create({
                data: {
                    address: data.address,
                    birthDate: data.birthDate,
                    civilStatus: data.civilStatus,
                    dni: data.dni,
                    documentType: data.documentType,
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    photo: data.photo,
                    sex: data.sex,
                    surnames: data.surnames,
                    access: {
                        create: {
                            username: data.access.username,
                            password: data.access.password,
                            roleId: data.access.roleId,
                            createAt: new Date(),
                            status: "offline",
                        },
                    },
                    Doctor: {
                        create: {
                            specialization: data.Doctor.specialization,
                            status: data.Doctor.status,
                            cmp: data.Doctor.cmp,
                            rne: data.Doctor.rne,
                            personalizedPrices: {
                                create: [
                                    {
                                        personalizedPrice: data.Doctor.personalizedPrices[0].personalizedPrice,
                                        medicalServiceId: data.Doctor.personalizedPrices[0].medicalServiceId,
                                    },
                                ],
                            },
                        },
                    },
                },
                include: {
                    access: true,
                    Doctor: {
                        include: {
                            personalizedPrices: true,
                        },
                    },
                },
            });
            return newUser;
        }
        else {
            const newUser = yield prisma_1.default.instance.user.create({
                data: {
                    address: data.address,
                    birthDate: data.birthDate,
                    civilStatus: data.civilStatus,
                    dni: data.dni,
                    documentType: data.documentType,
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    photo: data.photo,
                    sex: data.sex,
                    surnames: data.surnames,
                    access: {
                        create: {
                            username: data.access.username,
                            password: data.access.password,
                            roleId: data.access.roleId,
                            createAt: new Date(),
                            status: "offline",
                        },
                    },
                },
                include: {
                    access: true,
                },
            });
            return newUser;
        }
    });
}
exports.createUser = createUser;
function createDependent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDependent = yield prisma_1.default.instance.dependent.create({ data });
        return newDependent;
    });
}
exports.createDependent = createDependent;
function updateUser(dni, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.instance.user.update({
            where: { dni },
            data,
        });
        return user;
    });
}
exports.updateUser = updateUser;
function deleteUser(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield prisma_1.default.instance.user.delete({
            where: {
                dni,
            },
            include: {
                access: true,
            },
        });
        return deletedUser;
    });
}
exports.deleteUser = deleteUser;
// export async function searchbydni(dni: string): Promise<any> {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();
//   // Navegar a la páginas
//   await page.goto("https://eldni.com/pe/buscar-datos-por-dni");
//   // Completar el formulario con el número de DNI
//   await page.type("#dni", dni);
//   // Enviar el formulario
//   await page.click("#btn-buscar-datos-por-dni");
//   // Esperar a que la página cargue los resultados
//   await page.waitForSelector("#column-center");
//   // Extraer los resultados
//   const user = await page.evaluate(() => {
//     const nombresElement = document.querySelector(
//       "#column-center table tbody tr td:nth-child(2)"
//     );
//     const nombres = nombresElement ? nombresElement.textContent?.trim() : "";
//     const dniElement = document.querySelector(
//       "#column-center table tbody tr td:nth-child(1)"
//     );
//     const dni = dniElement ? dniElement.textContent?.trim() : "";
//     const apellidopElement = document.querySelector(
//       "#column-center table tbody tr td:nth-child(3)"
//     );
//     const apellidop = apellidopElement
//       ? apellidopElement.textContent?.trim()
//       : "";
//     const apellidomElement = document.querySelector(
//       "#column-center table tbody tr td:nth-child(4)"
//     );
//     const apellidom = apellidomElement
//       ? apellidomElement.textContent?.trim()
//       : "";
//     const digitoVerificadorElement = document.querySelector(
//       "#column-center table:nth-child(3) tbody tr td mark"
//     );
//     const digitoVerificador = digitoVerificadorElement
//       ? digitoVerificadorElement.textContent?.trim()
//       : "";
//     return { nombres, dni, digitoVerificador, apellidop, apellidom };
//   });
//   console.log("Resultados:", user);
//   await browser.close();
//   return user;
// }
