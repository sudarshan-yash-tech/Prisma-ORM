import { PrismaCourseRepository } from "../course/prisma-course-repository.js";
import { PrismaStudentRepository } from "../student/repositories/prisma-student.repository.js";
import { EnrollmentService } from "./enrollemnt.service.js";
import { EnrollmentController } from "./enrollment.controller.js";
import { createEnrollmentRouter } from "./enrollment.routes.js";
import { PrismaEnrollmentRepository } from "./prisma-enrollment.repository.js";

const studentRepository =
    new PrismaStudentRepository();

const courseRepository =
    new PrismaCourseRepository();

const enrollmentRepository =
    new PrismaEnrollmentRepository();

const enrollmentService =
    new EnrollmentService(
        studentRepository,
        courseRepository,
        enrollmentRepository,
    );

const enrollmentController =
    new EnrollmentController(
        enrollmentService,
    );

export const enrollmentRouter =
    createEnrollmentRouter(
        enrollmentController,
    );