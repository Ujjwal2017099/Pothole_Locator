const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    Image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
    },
    Coordinates: {
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
});

async function getPinCode(lat, lon) {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );

        if (
            response.data &&
            response.data.address &&
            response.data.address.postcode
        ) {
            return response.data.address.postcode;
        } else {
            return "Postal code not found";
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

locationSchema.virtual('PIN_Code').get(async ()=> {
    let lat = this.Coordinates[0] , lng = this.Coordinates[1];
    return await getPinCode(lat,lng)
});

locationSchema.index({ coordinates: "2dsphere" });
const Location = new mongoose.model("Location", locationSchema);

module.exports = Location;
