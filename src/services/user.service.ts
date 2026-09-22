import { Prisma } from "@prisma/client";
import userRepository from "../repositories/user.repository.js";
import { ApiError } from "../utils/api-error.js";

class UserService {
    async listUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            userRepository.findMany(skip, limit),
            userRepository.count(),
        ]);

        return { users, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }

    async getUser(id: string) {
        const user = await userRepository.findById(id);
        if (!user) throw new ApiError(404, "User not found");
        return user;
    }

    async updateUser(id: string, data: Prisma.SampleUserUpdateInput) {
        await this.getUser(id);
        try {
            return await userRepository.updateById(id, data);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ApiError(409, "Email or mobile is already in use");
            }
            throw error;
        }
    }

    async deleteUser(id: string) {
        await this.getUser(id);
        return userRepository.deleteById(id);
    }
}

export default new UserService();