const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({
    Image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
    },
    Loc: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    Time: {
        type: Date,
        default: Date.now,
    },
    Status: {
        type: Boolean,
        default: false,
    },
    Frequency: {
        type : Number,
        default : 1
    },
    PIN_Code : {
        type : Number
    }
});




locationSchema.index({ Loc: "2dsphere" });
const Location = new mongoose.model("Location", locationSchema);

module.exports = Location;
