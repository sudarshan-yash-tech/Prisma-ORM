import { Course } from "@prisma/client";
import { CreateCourseInput, ListCourseQuery, UpdateCourseInput } from "./course.dto.js";
import { updateStudentInput } from "../student/student.dto.js";

export interface CourseRepository {

    create(input: CreateCourseInput): Promise<Course>;

    findById(id: number): Promise<Course | null>;

    findByCode(code: string): Promise<Course | null>;

    findByTitle(title: string): Promise<Course| null>;

    findMany(query: ListCourseQuery): Promise<{ courses: Course[], count: number }>;

    update(id: number, input: UpdateCourseInput): Promise<Course>

    hasRelatedRecord(id: number): Promise<boolean>;

    delete(id: number): Promise<void>;

}