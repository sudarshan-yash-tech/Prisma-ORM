import { Prisma } from "@prisma/client";
import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler: ErrorRequestHandler = (error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details
            }
        })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return response.status(409).json({
            success: false,
            error: {
                code: 'UNIQUE_CONSTRAINT_VIOLATION',
                message: 'A record with the supplied unique value already exists!',
                details: error.meta
            }
        })

    }

    console.error(error);

    response.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
        },
    });

}