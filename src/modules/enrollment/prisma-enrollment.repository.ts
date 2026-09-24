import { Enrollment, EnrollmentStatus, Prisma } from "@prisma/client";
import { EnrollmentRepository, EnrollmentWithRelations } from "./enrollment.repository.js";
import { CreateEnrollmentInput, ListEnrollmentsQuery } from "./enrollment.dto.js";
import { prisma } from "../../config/prisma.js";

const enrollmentRelations = {
    student: true,
    course: true
} satisfies Prisma.EnrollmentInclude

export class PrismaEnrollmentRepository implements EnrollmentRepository {

    async create(input: CreateEnrollmentInput): Promise<EnrollmentWithRelations> {
        return prisma.enrollment.create({
            data: {
                studentId: input.studentId,
                courseId: input.courseId
            },
            include: {
                student: true,
                course: true
            }
        })
    }

    async findById(id: number): Promise<EnrollmentWithRelations | null> {
        return prisma.enrollment.findUnique({
            where: { id },
            include: enrollmentRelations
        })
    }

    async findByStudenAndCourse(studentId: number, courseId: number): Promise<EnrollmentWithRelations | null> {
        return prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            },
            include: {
                student: true,
                course: true
            }
        })
    }

    async findMany(query: ListEnrollmentsQuery): Promise<{ enrollments: EnrollmentWithRelations[]; total: number; }> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const where: Prisma.EnrollmentWhereInput = {
            studentId: query.studentId,
            courseId: query.courseId,
            status: query.status,
        };
        const [enrollments, total] =
            await prisma.$transaction([
                prisma.enrollment.findMany({
                    where,
                    include: enrollmentRelations,
                    skip,
                    take: limit,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),

                prisma.enrollment.count({
                    where,
                }),
            ]);

        return {
            enrollments,
            total,
        };
    }

    async findByStudentAndCourse(
        studentId: number,
        courseId: number,
    ): Promise<Enrollment | null> {
        return prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
    }

    async updateStatus(
        id: number,
        status: EnrollmentStatus,
    ): Promise<EnrollmentWithRelations> {
        return prisma.enrollment.update({
            where: { id },
            data: { status },
            include: enrollmentRelations,
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.enrollment.delete({
            where: { id },
        });
    }

    async findStudentByCourseId(
        courseId: number,
        options: {
            page: number;
            limit: number;
            status?: EnrollmentStatus;
        },
    ): Promise<{
        enrollments: EnrollmentWithRelations[];
        total: number;
    }> {
        const skip =
            (options.page - 1) * options.limit;

        const where: Prisma.EnrollmentWhereInput = {
            courseId,
            status: options.status,
        };

        const [enrollments, total] =
            await prisma.$transaction([
                prisma.enrollment.findMany({
                    where,
                    include: {
                        student: true,
                        course: true
                    },
                    skip,
                    take: options.limit,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),

                prisma.enrollment.count({
                    where,
                }),
            ]);

        return {
            enrollments,
            total,
        };
    }
}