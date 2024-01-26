const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    Otp : {
        type : String,
        required : true
    },
    createdAt: { type: Date, default: Date.now },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
