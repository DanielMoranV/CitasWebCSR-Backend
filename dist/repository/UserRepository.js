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
exports.deleteUser = exports.updateUser = exports.createDependent = exports.createUser = exports.deleteUserDependent = exports.updateUserDependent = exports.userBydniDependent = exports.userBydni = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
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
                    },
                },
            },
            include: {
                access: true,
                Doctor: true,
            },
        });
        return newUser;
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
