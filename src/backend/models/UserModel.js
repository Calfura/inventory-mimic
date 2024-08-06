const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
});

// Pre-save function to allow for encryption of passwords
userSchema.pre(
    "save",
    async function (next) {
        const user = this;

        if (!user.isModified("password")){
            return;
        } 

        // If we reach this line of code, the password is modified
        // and thus is not encrpted!
        // we must encrypt it!

        const hash = await bcrypt.hash(this.password, 10);

        console.log("Password, hashed encrpted and salted.")

        this.password = hash;

        next();
    }
)

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}