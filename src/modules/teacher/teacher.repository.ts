import type { Teacher } from "@prisma/client";
import {
    CreateTeacherInput,
    ListTeachersQuery,
    UpdateTeacherInput,
} from "./teacher.dto.js";


export interface TeacherRepository {
    create(
        input: CreateTeacherInput,
    ): Promise<Teacher>;

    findById(
        id: number,
    ): Promise<Teacher | null>;

    findByEmail(
        email: string,
    ): Promise<Teacher | null>;

    findMany(
        query: ListTeachersQuery,
    ): Promise<{
        teachers: Teacher[];
        total: number;
    }>;

    update(
        id: number,
        input: UpdateTeacherInput,
    ): Promise<Teacher>;

    hasAssignments(
        id: number,
    ): Promise<boolean>;

    delete(
        id: number,
    ): Promise<void>;
}