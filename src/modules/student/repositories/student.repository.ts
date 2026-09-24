import { Student } from '@prisma/client';
import { CreateStudentInput, ListStudentQuery, updateStudentInput } from '../student.dto.js';

export interface StudentRepository {

    create(input: CreateStudentInput): Promise<Student>;

    findById(id: number): Promise<Student | null>;

    findByEmail(email: string): Promise<Student | null>;

    findMany(query: ListStudentQuery): Promise<{
        students: Student[],
        total: number
    }>

    update(id: number, input: updateStudentInput): Promise<Student>;

    delete(id: number): Promise<void>
}