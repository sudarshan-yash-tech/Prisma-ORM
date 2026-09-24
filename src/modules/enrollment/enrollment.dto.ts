import { EnrollmentStatus } from "@prisma/client";

export interface CreateEnrollmentInput {
    studentId: number;
    courseId: number;
}

export interface UpdateEnrollementStatusInput {
    staus: EnrollmentStatus
}

export interface ListEnrollmentsQuery {
    page?: number;
    limit?: number;
    studentId?: number;
    courseId?: number;
    status?: EnrollmentStatus
}