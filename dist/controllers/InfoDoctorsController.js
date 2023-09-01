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
const DoctorsRepository_1 = require("../repository/DoctorsRepository");
const response_1 = require("../utils/response");
class InfoDoctorsHandler {
    getInfoDoctors(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const infoDoctors = yield (0, DoctorsRepository_1.getInfoDoctors)();
                if (infoDoctors.length != 0) {
                    const message = "Operación exitosa Información de Médicos";
                    (0, response_1.success)({ res, data: infoDoctors, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: infoDoctors, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = InfoDoctorsHandler;
