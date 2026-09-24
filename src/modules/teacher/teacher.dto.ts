export interface CreateTeacherInput {
    email: string;
    fullName: string;
    specialization?: string;
}

export interface UpdateTeacherInput {
    email?: string;
    fullName?: string;
    specialization?: string | null;
}

export interface ListTeachersQuery {
    page?: number;
    limit?: number;
    search?: string;
}