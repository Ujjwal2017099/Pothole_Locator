const mongoose = require("mongoose");

const pin_codeSchema = new mongoose.Schema({
    Pincode: {
        type: String,
        // required: true,
        unique: true,
        // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    District: {
        type: String,
        // required: true,
    },
    StateName : {
        type : String
    }
});

const pin_code = mongoose.model("Pin_Code", pin_codeSchema);

module.exports = pin_code;
