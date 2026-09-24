import { CourseController } from './course.controller.js';
import { createCourseRouter } from './course.routes.js';
import { CourseService } from './course.service.js';
import { PrismaCourseRepository } from './prisma-course-repository.js';

const courseRepository = new PrismaCourseRepository()

const courseSrvice = new CourseService(courseRepository);

const courseController = new CourseController(courseSrvice);

export const courseRouter = createCourseRouter(courseController)
