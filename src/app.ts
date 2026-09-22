import express, { type ErrorRequestHandler } from "express";
import userRoutes from "./routes/user.routes.js";
import { ApiError } from "./utils/api-error.js";

export const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.json({ success: true, message: "API is running" }));
app.use("/api/users", userRoutes);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const apiError = error instanceof ApiError ? error : null;
    if (!apiError) console.error(error);
    res.status(apiError?.statusCode ?? 500).json({
        success: false,
        message: apiError?.message ?? "Internal server error",
        details: apiError?.details,
    });
};

app.use(errorHandler);