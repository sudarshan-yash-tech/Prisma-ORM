import { StudentController } from "./controllers/student.controller.js";
import { PrismaStudentRepository } from "./repositories/prisma-student.repository.js";
import { StudentService } from "./services/student.service.js";
import { createStudentRouter } from "./student.route.js";

const studentRepository =
    new PrismaStudentRepository();

const studentService =
    new StudentService(studentRepository);

const studentController =
    new StudentController(studentService);

export const studentRouter =
    createStudentRouter(studentController);