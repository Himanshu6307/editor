import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: [70, "must be under 60 letter"]
    },
    password: {
        type: String,
        required: true
    }
});

// Static method to hash password
UserSchema.statics.hashedPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Method to create JWT token
UserSchema.methods.createToken = function() {
    return jwt.sign(
        { userId: this._id, email: this.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
    );
};

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;