import { PrismaTeacherRepository } from "./prisma-teacher.repository.js";
import { TeacherController } from "./teacher.controller.js";
import { createTeacherRouter } from "./teacher.routes.js";
import { TeacherService } from "./teacher.service.js";

const teacherRepository =
    new PrismaTeacherRepository();

const teacherService =
    new TeacherService(teacherRepository);

const teacherController =
    new TeacherController(teacherService);

export const teacherRouter =
    createTeacherRouter(teacherController);