const mongoose = require("mongoose");
require('dotenv').config();

const DB = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@aushadhi-aikyam.olipfgx.mongodb.net/Pothole_Locator`;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(async () => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err.message);
    });
