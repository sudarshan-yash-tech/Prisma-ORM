import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { CourseController } from "./course.controller.js";

export function createCourseRouter(
    controller: CourseController,
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