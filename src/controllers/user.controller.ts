import type { Request, Response } from "express";
import userService from "../services/user.service.js";
import { ApiError } from "../utils/api-error.js";

const parsePositiveInt = (value: unknown, fallback: number) => {
    const parsed = Number(value ?? fallback);
    if (!Number.isInteger(parsed) || parsed < 1) {
        throw new ApiError(400, "Pagination values must be positive integers");
    }
    return parsed;
};

export const listUsers = async (req: Request, res: Response) => {
    const page = parsePositiveInt(req.query.page, 1);
    const limit = Math.min(parsePositiveInt(req.query.limit, 20), 100);
    res.json({ success: true, data: await userService.listUsers(page, limit) });
};

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string") throw new ApiError(400, "A valid user id is required");
    res.json({ success: true, data: await userService.getUser(id) });
};

export const updateUser = async (req: Request, res: Response) => {
    const allowedFields = ["name", "email", "age"] as const;
    const data = Object.fromEntries(
        allowedFields
            .filter((field) => req.body[field] !== undefined)
            .map((field) => [field, req.body[field]]),
    );
    if (Object.keys(data).length === 0) {
        throw new ApiError(400, "At least one user field is required");
    }
    const id = req.params.id;
    if (typeof id !== "string") throw new ApiError(400, "A valid user id is required");
    res.json({ success: true, data: await userService.updateUser(id, data) });
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string") throw new ApiError(400, "A valid user id is required");
    await userService.deleteUser(id);
    res.status(204).send();
};