import { Router } from "express";
import { EnrollmentController } from "./enrollment.controller.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

export function createEnrollmentRouter(
    controller: EnrollmentController,
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
        "/:id/status",
        asyncHandler(controller.updateStatus),
    );

    router.delete(
        "/:id",
        asyncHandler(controller.delete),
    );

    router.get(
        "/course/:courseId/students",
        asyncHandler(
            controller.findStudentsByCourse,
        ),
    );

    return router;
}