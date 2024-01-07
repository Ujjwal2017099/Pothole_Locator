const mongoose = require("mongoose");

const DB = `mongodb+srv://Ujjwal:4XgZs1WGLyGvjSGn@cluster0.7ucvtkq.mongodb.net/GRID?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(async () => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err.message);
    });
