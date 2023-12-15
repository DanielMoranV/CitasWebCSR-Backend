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
exports.updateAccessId = exports.updateAccess = exports.logout = exports.updateLastSession = exports.createAccessUser = exports.getAccess = exports.accessBydni = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function accessBydni(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.findFirst({
            where: { username },
            include: {
                user: {
                    include: {
                        Doctor: true,
                    },
                },
                role: true,
            },
        });
    });
}
exports.accessBydni = accessBydni;
function getAccess() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.findMany({
            orderBy: {
                userId: "asc",
            },
        });
    });
}
exports.getAccess = getAccess;
function createAccessUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newAccessUser = yield prisma_1.default.instance.access.create({ data });
        return newAccessUser;
    });
}
exports.createAccessUser = createAccessUser;
function updateLastSession(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.updateMany({
            where: { username },
            data: {
                lastSession: new Date(),
                status: "online",
            },
        });
    });
}
exports.updateLastSession = updateLastSession;
function logout(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.updateMany({
            where: { username },
            data: {
                status: "offline",
            },
        });
    });
}
exports.logout = logout;
function updateAccess(username, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.updateMany({
            where: { username },
            data,
        });
    });
}
exports.updateAccess = updateAccess;
function updateAccessId(accessId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.update({
            where: { accessId },
            data,
        });
    });
}
exports.updateAccessId = updateAccessId;
