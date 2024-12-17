const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Teacher"],
    },
    class: {
        type: String,
        required: function () {
            return this.role === "Teacher";
        },
        trim: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);