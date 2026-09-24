import { Router } from "express";
import { studentRouter } from "../modules/student/student.module.js";
import { courseRouter } from "../modules/course/course.module.js";
import { teacherRouter } from "../modules/teacher/teacher.module.js";
import { enrollmentRouter } from "../modules/enrollment/enrollment.module.js";

export const apiRouter = Router();
apiRouter.use('/students', studentRouter)
apiRouter.use('/courses', courseRouter)
apiRouter.use('/teachers', teacherRouter)
apiRouter.use(
    "/enrollments",
    enrollmentRouter,
);