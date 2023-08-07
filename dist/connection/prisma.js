"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = {
    instance: new client_1.PrismaClient()
};
Object.freeze(prisma);
exports.default = prisma;
