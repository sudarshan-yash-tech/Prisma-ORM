class Course {

    constructor(public readonly id: string, private enrollMentCount: number, private isActive: boolean) {
        if (enrollMentCount < 0) {
            throw new Error('Enrollment completed!')
        }
    }

    hasAvailableSeats(): boolean {
        console.log(this.enrollMentCount, this.enrollMentCount >= 0);
        return this.enrollMentCount >= 0
    }

    reserveSeat(): boolean | string {
        if (this.hasAvailableSeats()) {
            this.enrollMentCount--;
            return true
        } else {
            return 'No Seats Available!'
        }
    }

    getEnrolledCount(): number {
        return this.enrollMentCount;
    }
}

const course = new Course('1', 3, true);
console.log(course);
course.reserveSeat();
course.getEnrolledCount();
course.reserveSeat();
course.getEnrolledCount();
course.reserveSeat();
course.getEnrolledCount();
course.reserveSeat();
course.getEnrolledCount();
console.log(course.reserveSeat(), course.getEnrolledCount())
console.log(course.reserveSeat(), course.getEnrolledCount())
console.log(course.getEnrolledCount(), 'enrolledCount');