var Course = /** @class */ (function () {
    function Course(id, enrollMentCount, isActive) {
        this.id = id;
        this.enrollMentCount = enrollMentCount;
        this.isActive = isActive;
        if (enrollMentCount >= 0) {
            throw new Error('Enrollment completed!');
        }
    }
    Course.prototype.hasAvailableSeats = function () {
        return true;
    };
    Course.prototype.reserveSeat = function () {
        if (this.hasAvailableSeats()) {
            this.enrollMentCount--;
            return true;
        }
        else {
            return false;
        }
    };
    Course.prototype.getEnrolledCount = function () {
        return this.enrollMentCount;
    };
    return Course;
}());
var course = new Course('1', 3, true);
console.log(course);
// console.log(course.reserveSeat(), course.getEnrolledCount())
