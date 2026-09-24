import { Router } from "express";
import { TeacherController } from "./teacher.controller.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

export function createTeacherRouter(
    controller: TeacherController,
): Router {
    const router = Router();

    router.post(
        "/",
        asyncHandler(controller.create),
    );

    router.get(
        "/",
        asyncHandler(controller.findMany),
    );

    router.get(
        "/:id",
        asyncHandler(controller.findById),
    );

    router.patch(
        "/:id",
        asyncHandler(controller.update),
    );

    router.delete(
        "/:id",
        asyncHandler(controller.delete),
    );

    return router;
}