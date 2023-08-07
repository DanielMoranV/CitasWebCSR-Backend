"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const constant_1 = require("../core/constant");
function success({ res, status = constant_1.SUCCESS_STATUS, data, message, }) {
    return res.status(status).json({
        status: "success",
        data,
        message,
    });
}
exports.success = success;
function failure({ res, status = constant_1.BAD_REQUEST, message, }) {
    return res.status(status).json({
        status: "error",
        data: null,
        message,
    });
}
exports.failure = failure;
