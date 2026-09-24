import { Request, Response } from "express";
import { CourseService } from "./course.service.js";
import { CreateCourseInput, ListCourseQuery, UpdateCourseInput } from "./course.dto.js";
import { AppError } from "../../common/errors/AppError.js";

export class CourseController {
    constructor(
        private readonly courseService:
            CourseService,
    ) { }

    create = async (
        request: Request<
            Record<string, never>,
            unknown,
            CreateCourseInput
        >,
        response: Response,
    ): Promise<void> => {
        const course =
            await this.courseService.createCourse(
                request.body,
            );

        response.status(201).json({
            success: true,
            data: course,
        });
    };

    findById = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const course =
            await this.courseService.getCourseById(id);

        response.status(200).json({
            success: true,
            data: course,
        });
    };

    findMany = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const query: ListCourseQuery = {
            page: this.parseOptionalNumber(
                request.query.page,
                "page",
            ),

            limit: this.parseOptionalNumber(
                request.query.limit,
                "limit",
            ),

            search:
                typeof request.query.search === "string"
                    ? request.query.search
                    : undefined,
        };

        const result =
            await this.courseService.listCourses(
                query,
            );

        response.status(200).json({
            success: true,
            data: result.courses,
            pagination: result.pagination,
        });
    };

    update = async (
        request: Request<
            { id: string },
            unknown,
            UpdateCourseInput
        >,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const course =
            await this.courseService.updateCourse(
                id,
                request.body,
            );

        response.status(200).json({
            success: true,
            data: course,
        });
    };

    delete = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        await this.courseService.deleteCourse(id);

        response.status(204).send();
    };

    private parseId(value: string): number {
        const id = Number(value);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(
                400,
                "INVALID_COURSE_ID",
                "Course ID must be a positive integer.",
            );
        }

        return id;
    }

    private parseOptionalNumber(
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