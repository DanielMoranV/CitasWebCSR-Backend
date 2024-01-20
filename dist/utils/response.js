"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const constant_1 = require("../core/constant");
const http_1 = require("http");
const tls_1 = require("tls");
function success({ res, status = constant_1.SUCCESS_STATUS, data, message, }) {
    return sendJsonResponse(res, status, {
        status: "success",
        data,
        message,
    });
}
exports.success = success;
function failure({ res, status = constant_1.BAD_REQUEST, message, }) {
    return sendJsonResponse(res, status, {
        status: "error",
        data: null,
        message,
    });
}
exports.failure = failure;
function sendJsonResponse(res, status, payload) {
    try {
        const serializedData = JSON.stringify(payload.data, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (value instanceof Error) {
                    return {
                        // Extract relevant information from the Error object
                        name: value.name,
                        message: value.message,
                        stack: value.stack,
                    };
                }
                if (value instanceof Buffer) {
                    return value.toString("base64"); // Serialize Buffers to base64
                }
                if (value instanceof Set) {
                    return Array.from(value); // Serialize Sets to Arrays
                }
                if (value instanceof http_1.ClientRequest || value instanceof tls_1.TLSSocket) {
                    // Evitar propiedades que causen la circularidad
                    return {
                        _isClientRequest: true,
                        // ... otras propiedades relevantes para tu caso
                    };
                }
            }
            return value;
        });
        return res.status(status).json(Object.assign(Object.assign({}, payload), { data: JSON.parse(serializedData) }));
    }
    catch (error) {
        // Handle any errors during serialization
        console.error("Error during serialization:", error);
        return res.status(constant_1.BAD_REQUEST).json({
            status: "error",
            data: null,
            message: "Error during serialization",
        });
    }
}
