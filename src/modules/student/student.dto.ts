export interface CreateStudentInput {
    email: string,
    fullName: string,
    phoneNumber?: string
}

export interface updateStudentInput {
    email?: string,
    fullName?: string,
    phoneNumber?: string | null
}

export interface ListStudentQuery {
    page?: number,
    limit?: number,
    search?: string
}