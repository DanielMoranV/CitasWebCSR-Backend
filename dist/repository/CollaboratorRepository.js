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
exports.deleteCollaborator = exports.updateCollaborator = exports.createCollaborator = exports.collaboratorBydni = exports.getCollaborators = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getCollaborators() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.findMany({
            where: {
                roleId: {
                    in: [1, 2],
                },
                active: true,
            },
            orderBy: {
                userId: "asc",
            },
            include: {
                user: true,
            },
        });
    });
}
exports.getCollaborators = getCollaborators;
function collaboratorBydni(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findFirst({
            where: {
                dni,
                access: {
                    some: {
                        roleId: {
                            in: [1, 2, 3],
                        },
                    },
                },
            },
            include: {
                access: true,
            },
        });
    });
}
exports.collaboratorBydni = collaboratorBydni;
function createCollaborator(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield prisma_1.default.instance.user.create({ data });
        return newUser;
    });
}
exports.createCollaborator = createCollaborator;
function updateCollaborator(dni, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.instance.user.update({
            where: { dni },
            data,
        });
        return user;
    });
}
exports.updateCollaborator = updateCollaborator;
function deleteCollaborator(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield prisma_1.default.instance.user.delete({
            where: {
                dni,
                access: {
                    some: {
                        roleId: {
                            in: [1, 2, 3],
                        },
                    },
                },
            },
            include: {
                access: true,
            },
        });
        return deletedUser;
    });
}
exports.deleteCollaborator = deleteCollaborator;
