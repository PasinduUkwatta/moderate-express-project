const bcrypt = require('bcryptjs');

class User {
    constructor(email, password) {
        this.email = email;
        this.passwordHash = bcrypt.hashSync(password, 10);
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }
}

module.exports = User;
