const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
    },
    Password: {
        type : String,
        required:true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;