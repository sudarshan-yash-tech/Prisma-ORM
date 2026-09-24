import type {
    Request,
    Response,
} from "express";
import { StudentService } from "../services/student.service.js";
import { CreateStudentInput, ListStudentQuery, updateStudentInput } from "../student.dto.js";
import { AppError } from "../../../common/errors/AppError.js";

export class StudentController {
    constructor(
        private readonly studentService:
            StudentService,
    ) { }

    create = async (
        request: Request<
            Record<string, never>,
            unknown,
            CreateStudentInput
        >,
        response: Response,
    ): Promise<void> => {
        const student =
            await this.studentService.createStudentInput(
                request.body,
            );

        response.status(201).json({
            success: true,
            data: student,
        });
    };

    findById = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const student =
            await this.studentService.getStudentById(id);
        
        response.status(200).json({
            success: true,
            data: student,
        });
    };

    findMany = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const query: ListStudentQuery = {
            page: request.query.page
                ? Number(request.query.page)
                : undefined,
            
            limit: request.query.limit
                ? Number(request.query.limit)
                : undefined,
            
            search:
                typeof request.query.search === "string"
                    ? request.query.search
                    : undefined,
        };

        if (
            query.page !== undefined &&
            !Number.isInteger(query.page)
        ) {
            throw new AppError(
                400,
                "INVALID_PAGE",
                "Page must be an integer.",
            );
        }

        if (
            query.limit !== undefined &&
            !Number.isInteger(query.limit)
        ) {
            throw new AppError(
                400,
                "INVALID_LIMIT",
                "Limit must be an integer.",
            );
        }
        
        const result =
            await this.studentService.listStudents(
                query,
            );

        response.status(200).json({
            success: true,
            data: result.students,
            pagination: result.pagination,
        });
    };

    update = async (
        request: Request<
            { id: string },
            unknown,
            updateStudentInput
        >,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        const student =
            await this.studentService.updateStudent(
                id,
                request.body,
            );

        response.status(200).json({
            success: true,
            data: student,
        });
    };

    delete = async (
        request: Request<{ id: string }>,
        response: Response,
    ): Promise<void> => {
        const id = this.parseId(request.params.id);

        await this.studentService.deleteStudent(id);

        response.status(204).send();
    };

    private parseId(value: string): number {
        const id = Number(value);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(
                400,
                "INVALID_STUDENT_ID",
                "Student ID must be a positive integer.",
            );
        }

        return id;
    }
}