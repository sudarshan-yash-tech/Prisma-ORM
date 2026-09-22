import type { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

const userSelect = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.SampleUserSelect;

class UserRepository {
    findMany(skip: number, take: number) {
        return prisma.sampleUser.findMany({ skip, take, orderBy: { createdAt: "desc" }, select: userSelect });
    }

    count() {
        return prisma.sampleUser.count();
    }

    findById(id: string) {
        return prisma.sampleUser.findUnique({ where: { id: Number(id) }, select: userSelect });
    }

    updateById(id: string, data: Prisma.SampleUserUpdateInput) {
        return prisma.sampleUser.update({ where: { id: Number(id) }, data, select: userSelect });
    }

    deleteById(id: string) {
        return prisma.sampleUser.delete({ where: { id: Number(id) }, select: userSelect });
    }
}

export default new UserRepository();