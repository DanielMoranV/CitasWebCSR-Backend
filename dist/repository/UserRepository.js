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
exports.searchbydni = exports.deleteUser = exports.updateUser = exports.createDependent = exports.createUser = exports.deleteUserDependent = exports.updateUserDependent = exports.getPatients = exports.userBydniDependent = exports.userBydni = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const puppeteer_1 = __importDefault(require("puppeteer"));
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
                userId: "asc",
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
function searchbydni(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: "new" });
        const page = yield browser.newPage();
        // Navegar a la páginas
        yield page.goto("https://eldni.com/pe/buscar-datos-por-dni");
        // Completar el formulario con el número de DNI
        yield page.type("#dni", dni);
        // Enviar el formulario
        yield page.click("#btn-buscar-datos-por-dni");
        // Esperar a que la página cargue los resultados
        yield page.waitForSelector("#column-center");
        // Extraer los resultados
        const user = yield page.evaluate(() => {
            var _a, _b, _c, _d, _e;
            const nombresElement = document.querySelector("#column-center table tbody tr td:nth-child(2)");
            const nombres = nombresElement ? (_a = nombresElement.textContent) === null || _a === void 0 ? void 0 : _a.trim() : "";
            const dniElement = document.querySelector("#column-center table tbody tr td:nth-child(1)");
            const dni = dniElement ? (_b = dniElement.textContent) === null || _b === void 0 ? void 0 : _b.trim() : "";
            const apellidopElement = document.querySelector("#column-center table tbody tr td:nth-child(3)");
            const apellidop = apellidopElement
                ? (_c = apellidopElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()
                : "";
            const apellidomElement = document.querySelector("#column-center table tbody tr td:nth-child(4)");
            const apellidom = apellidomElement
                ? (_d = apellidomElement.textContent) === null || _d === void 0 ? void 0 : _d.trim()
                : "";
            const digitoVerificadorElement = document.querySelector("#column-center table:nth-child(3) tbody tr td mark");
            const digitoVerificador = digitoVerificadorElement
                ? (_e = digitoVerificadorElement.textContent) === null || _e === void 0 ? void 0 : _e.trim()
                : "";
            return { nombres, dni, digitoVerificador, apellidop, apellidom };
        });
        console.log("Resultados:", user);
        yield browser.close();
        return user;
    });
}
exports.searchbydni = searchbydni;
