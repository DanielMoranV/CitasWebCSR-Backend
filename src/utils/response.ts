import { Response } from "express";
import { BAD_REQUEST, SUCCESS_STATUS } from "../core/constant";
import { IResponse } from "../repository/Response";
import { ClientRequest } from "http";
import { TLSSocket } from "tls";

export function success({
  res,
  status = SUCCESS_STATUS,
  data,
  message,
}: IResponse): Response {
  return sendJsonResponse(res, status, {
    status: "success",
    data,
    message,
  });
}

export function failure({
  res,
  status = BAD_REQUEST,
  message,
}: IResponse): Response {
  return sendJsonResponse(res, status, {
    status: "error",
    data: null,
    message,
  });
}

function sendJsonResponse(
  res: Response,
  status: number,
  payload: any
): Response {
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
        if (value instanceof ClientRequest || value instanceof TLSSocket) {
          // Evitar propiedades que causen la circularidad
          return {
            _isClientRequest: true,
            // ... otras propiedades relevantes para tu caso
          };
        }
      }
      return value;
    });

    return res.status(status).json({
      ...payload,
      data: JSON.parse(serializedData),
    });
  } catch (error) {
    // Handle any errors during serialization
    console.error("Error during serialization:", error);
    return res.status(BAD_REQUEST).json({
      status: "error",
      data: null,
      message: "Error during serialization",
    });
  }
}
