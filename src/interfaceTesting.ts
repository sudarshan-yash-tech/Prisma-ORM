interface CourseRepository {
    findById(id: string): void;
}

class PrismaCourseRepository implements CourseRepository {
    findById(id: string): void {
        console.log("Prisma findById:", id);
    }

    findByTitle(title: string): void {
        console.log("Prisma findByTitle:", title);
    }
}

class EnrollmentService {
    constructor(
        private courseRepo: CourseRepository
    ) { }

    enroll() {
        this.courseRepo.findById("101");
    }
}

const prismaRepo = new PrismaCourseRepository();
const service = new EnrollmentService(prismaRepo);

service.enroll();
``