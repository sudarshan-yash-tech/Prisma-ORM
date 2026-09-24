export interface CreateCourseInput {
    code: string
    title: string
    description?: string
}

export interface UpdateCourseInput {
    code?: string;
    title?: string;
    description?: string | null
}

export interface ListCourseQuery {
    page?: number;
    limit?: number;
    search?: string | null
}

