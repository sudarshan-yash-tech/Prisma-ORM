export class Course {

    public static readonly MAX_CAPACITY = 60;

    constructor(
        public readonly id: string,
        private enrolledCount: number,
        private active: boolean
    ) {
        if (
            enrolledCount < 0 ||
            enrolledCount > Course.MAX_CAPACITY
        ) {
            throw new Error(
                "Invalid enrolled count"
            );
        }
    }

    canEnroll(): boolean {
        return this.active && this.enrolledCount < Course.MAX_CAPACITY;
    }

    reserveSeat(): void {
        if (!this.canEnroll()) {
            throw new Error("Cannot reserve seat: course is either inactive or full.");
        }

        this.enrolledCount++;
    }

    getAvailableSeats(): number {
        return Course.MAX_CAPACITY - this.enrolledCount;
    }
    
}