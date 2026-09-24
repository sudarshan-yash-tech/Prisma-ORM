import { Course, Enrollment, EnrollmentStatus, Student } from "@prisma/client";
import { CreateEnrollmentInput, ListEnrollmentsQuery } from "./enrollment.dto.js";

export type EnrollmentWithRelations = Enrollment & {
    student: Student,
    course: Course
}

export interface EnrollmentRepository {

    create(input: CreateEnrollmentInput): Promise<EnrollmentWithRelations>;

    findById(id: number): Promise<EnrollmentWithRelations | null>;

    findByStudentAndCourse(studentId: number, courseId: number): Promise<Enrollment | null>;

    findMany(query: ListEnrollmentsQuery): Promise<{
        enrollments: EnrollmentWithRelations[],
        total: number
    }>

    updateStatus(id: number,
        status: EnrollmentStatus
    ): Promise<EnrollmentWithRelations>

    delete(id: number): Promise<void>;

    findStudentByCourseId(courseId: number, options: {
        page: number,
        limit: number,
        status?: EnrollmentStatus
    }): Promise<{
        enrollments: EnrollmentWithRelations[],
        total: number
    }>
}