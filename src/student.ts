class Student {
    public readonly email: string;

    constructor(email: string) {
        this.email = email; // ✅ Allowed
    }

    updateEmail(newEmail: string) {
        this.email = newEmail; // ❌ Error
    }
}

let std = new Student('sudarshan.mane@gmail.com');
std.updateEmail('std@')
console.log(std.email);