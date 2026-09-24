var Student = /** @class */ (function () {
    function Student(email) {
        this.email = email; // ✅ Allowed
    }
    Student.prototype.updateEmail = function (newEmail) {
        this.email = newEmail; // ❌ Error
    };
    return Student;
}());
var std = new Student('sudarshan.mane@gmail.com');
std.updateEmail('std@');
console.log(std.email);
