import type {
    Prisma,
    Teacher,
} from "@prisma/client";
import { TeacherRepository } from "./teacher.repository.js";
import { CreateTeacherInput, ListTeachersQuery, UpdateTeacherInput } from "./teacher.dto.js";
import { prisma } from "../../config/prisma.js";

export class PrismaTeacherRepository
    implements TeacherRepository {
    async create(
        input: CreateTeacherInput,
    ): Promise<Teacher> {
        return prisma.teacher.create({
            data: {
                email: input.email,
                fullName: input.fullName,
                specialization: input.specialization,
            },
        });
    }

    async findById(
        id: number,
    ): Promise<Teacher | null> {
        return prisma.teacher.findUnique({
            where: { id },
        });
    }

    async findByEmail(
        email: string,
    ): Promise<Teacher | null> {
        return prisma.teacher.findUnique({
            where: { email },
        });
    }

    async findMany(
        query: ListTeachersQuery,
    ): Promise<{
        teachers: Teacher[];
        total: number;
    }> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const search = query.search?.trim();

        const where: Prisma.TeacherWhereInput =
            search
                ? {
                    OR: [
                        {
                            fullName: {
                                contains: search,
                            },
                        },
                        {
                            email: {
                                contains: search,
                            },
                        },
                        {
                            specialization: {
                                contains: search,
                            },
                        },
                    ],
                }
                : {};

        const [teachers, total] =
            await prisma.$transaction([
                prisma.teacher.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),

                prisma.teacher.count({
                    where,
                }),
            ]);

        return {
            teachers,
            total,
        };
    }

    async update(
        id: number,
        input: UpdateTeacherInput,
    ): Promise<Teacher> {
        return prisma.teacher.update({
            where: { id },
            data: input,
        });
    }

    async hasAssignments(
        id: number,
    ): Promise<boolean> {
        const assignmentCount =
            await prisma.teachingAssignment.count({
                where: {
                    teacherId: id,
                },
            });

        return assignmentCount > 0;
    }

    async delete(id: number): Promise<void> {
        await prisma.teacher.delete({
            where: { id },
        });
    }
}
