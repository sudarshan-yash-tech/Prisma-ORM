import type {
    Request,
    Response,
} from "express";
import { TeacherService } from "./teacher.service.js";
import { CreateTeacherInput, ListTeachersQuery, UpdateTeacherInput } from "./teacher.dto.js";
import { AppError } from "../../common/errors/AppError.js";

export class TeacherController {
    constructor(
        private readonly teacherService:
            TeacherService,
    ) { }

    create = async (
        request: Request<
            Record<string, never>,
            unknown,
            CreateTeacherInput
        >,
        response: Response,
    ): Promise<void> => {
        const teacher =
            await this.teacherService.createTeacher(
                request.body,
            );

        response.status(201).json({
            success: true,
            data: teacher,
        });
    };

    findById = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const teacher =
            await this.teacherService.getTeacherById(
                id,
            );

        response.status(200).json({
            success: true,
            data: teacher,
        });
    };

    findMany = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const query: ListTeachersQuery = {
            page: this.parseOptionalInteger(
                request.query.page,
                "page",
            ),

            limit: this.parseOptionalInteger(
                request.query.limit,
                "limit",
            ),

            search:
                typeof request.query.search === "string"
                    ? request.query.search
                    : undefined,
        };

        const result =
            await this.teacherService.listTeachers(
                query,
            );

        response.status(200).json({
            success: true,
            data: result.teachers,
            pagination: result.pagination,
        });
    };

    update = async (
        request: Request<
            { id: string },
            unknown,
            UpdateTeacherInput
        >,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const teacher =
            await this.teacherService.updateTeacher(
                id,
                request.body,
            );

        response.status(200).json({
            success: true,
            data: teacher,
        });
    };

    delete = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        await this.teacherService.deleteTeacher(id);

        response.status(204).send();
    };

    private parseId(value: string): number {
        const id = Number(value);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(
                400,
                "INVALID_TEACHER_ID",
                "Teacher ID must be a positive integer.",
            );
        }

        return id;
    }

    private parseOptionalInteger(
        value: unknown,
        fieldName: string,
    ): number | undefined {
        if (value === undefined) {
            return undefined;
        }

        if (
            typeof value !== "string" ||
            value.trim() === ""
        ) {
            throw new AppError(
                400,
                `INVALID_${fieldName.toUpperCase()}`,
                `${fieldName} must be an integer.`,
            );
        }

        const parsedValue = Number(value);

        if (!Number.isInteger(parsedValue)) {
            throw new AppError(
                400,
                `INVALID_${fieldName.toUpperCase()}`,
                `${fieldName} must be an integer.`,
            );
        }

        return parsedValue;
    }
}