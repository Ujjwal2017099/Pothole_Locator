const express = require("express");
require("./connection/connection");
const Location = require("./models/location");
const Image = require("./models/image");
const User = require("./models/user");
const Otp = require("./models/otp");
const pin_code = require("./models/pin_code");
const app = express();
const port = 4000;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(fileUpload());
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

function generateRandomOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.ACCOUNT_PASSWORD,
    },
});

function sendOTPEmail(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: "Your Password Change OTP Verification",
        text: `
Dear user,

You recently requested to change your password for your PotholeLocator account. To ensure the security of your account, we require verification through a One-Time Password (OTP).

Your OTP is: ${otp}

Please enter this OTP on the password change screen to proceed with updating your password. This OTP is valid for 5 minutes and can be used only once.

For your security, never share your OTP with anyone.

Best regards,
The PotholeLocator Team
            `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

async function findLocationsNearby(latitude, longitude) {
    // console.log(await Location.find());
    try {
        const result = await Location.find({
            Loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 50,
                    $minDistance: 0,
                },
            },
            Status: false,
        });
        if (result.length === 0) return false;
        result.forEach(async (e) => {
            e.Frequency++;
            await e.save();
        });

        // result.save();
        // console.log(result);
    } catch (error) {
        console.error("Error:", error.message);
    }

    return true;
}

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
            console.log(response.data.address.postcode);
            return response.data.address.postcode;
        } else {
            return "Postal code not found";
        }
    } catch (error) {
        console.error("Error:", error.message);
        // throw error;
    }
}

async function saveLocation(ImageId, latitude, longitude) {
    try {
        const pin = await getPinCode(latitude, longitude);
        const newLocation = new Location({
            Image: ImageId,
            Loc: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
            PIN_Code: pin,
        });

        await newLocation.save();
        console.log("Location saved successfully:", newLocation);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function saveImageToMongoDB(name, type) {
    try {
        const file_path = __dirname + "/uploads/" + name;
        const imageBuffer = fs.readFileSync(file_path);

        const newImage = new Image({
            data: imageBuffer,
            contentType: type,
        });

        await newImage.save();

        console.log("Image saved to MongoDB Atlas");
        return { status: true, ImageId: newImage._id };
    } catch (err) {
        console.log(err.message);
    }

    return { status: false };
}

app.get("/login", async (req, res) => {
    try {
        const r = await User.find({
            Email: req.query.email,
            Password: req.query.password,
        });
        if (r.length) {
            return res.status(200).send(
                jwt.sign(
                    {
                        Email: req.query.email,
                        Password: req.query.password,
                    },
                    process.env.ACCESS_KEY
                )
            );
        } else {
            return res.status(404).send("Enter Correct Details");
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

app.get("/admin-pothole-data", async (req, res) => {
    try {
        const token = req.query.id;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {
                return res.status(404).send(err.message);
            }
            const x = User.findOne({
                Email: user.Email,
                Password: user.Password,
            });

            if (x !== null) {
                const pin = req.query.pin_code;
                const response = await Location.find({
                    PIN_Code: JSON.parse(pin),
                    Status: false,
                });

                return res.status(200).send(response);
            }
        });
    } catch (error) {
        res.status(501).send(error.message);
    }
});

app.get("/get-image", async (req, res) => {
    try {
        const img = await Image.findById(req.query.img_id);

        res.contentType(img.contentType);
        res.setHeader("Content-Type", img.contentType);
        return res.status(200).send(img.data);
    } catch (error) {
        console.log(error.message);

        res.sendStatus(501);
    }
});

app.post("/upload-pothole-location", async (req, res) => {
    try {
        console.log("Entry")
        const x = await findLocationsNearby(
            req.body.latitude,
            req.body.longitude
        );
        console.log(req.body)
        if (x === true) return res.status(200).send("already exist");
        if (req.files) {
            const file = req.files.file;
            console.log(file);
            const name = Date.now() + file.name;
            const file_path = __dirname + "\\uploads\\" + name;
            const type = file.mimetype;

            file.mv(file_path, async (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                console.log("file uploaded successfully");
                const x = await saveImageToMongoDB(name, type);
                // res.send(x);
                fs.unlink(file_path, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    } else {
                        console.log("File deleted successfully.");
                    }
                });

                if (x.status === true) {
                    const imgId = x.ImageId;
                    await saveLocation(
                        imgId,
                        req.body.latitude,
                        req.body.longitude
                    );
                    return res.sendStatus(201);
                } else {
                    console.log("some error occured");
                    return res.sendStatus(501);
                }
            });
        } else {
            console.log("File not recieved");
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error.message);
        res.sendStatus(501);
    }
});

app.get("/unfilled-potholes", async (req, res) => {
    try {
        const query = Location.find();
        query.where("Status").equals(false);

        if (req.query.pin_code && req.query.pin_code.length === 6)
            query.where("PIN_Code").equals(parseInt(req.query.pin_code));
        if (req.query.year && req.query.year.length > 0)
            query
                .where("Time")
                .gte(new Date(JSON.parse(req.query.year), 0, 1))
                .lt(new Date(JSON.parse(req.query.year) + 1, 0, 1));

        const response = await query.exec();
        return res.status(200).send(response);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(501);
    }
});

app.get("/year-wise-data", async (req, res) => {
    try {
        const result = await Location.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$Time" },
                        status: "$Status",
                        // You can add more grouping criteria here if needed
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    year: "$_id.year",
                    status: "$_id.status",
                    count: 1,
                },
            },
        ]);

        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(501).send(error.message);
    }
});

app.get("/pothole-filled", async (req, res) => {
    try {
        const id = req.query.pothole_id;
        const response = await Location.findOneAndUpdate({
            _id: id,
            Status: true,
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(501);
    }
});

app.get("/pin_codes", async (req, res) => {
    try {
        const response = await pin_code.find();

        res.status(200).send(response);
    } catch (error) {
        res.sendStatus(501);
    }
});

app.post("/send-otp", async (req, res) => {
    try {
        const email = req.query.adminEmail;
        const check = await User.findOne({ Email: email });
        // console.log(check);
        if (check !== null) {
            const otp = generateRandomOTP();
            const x = new Otp({
                Email: email,
                Otp: otp,
            });

            await x.save();
            sendOTPEmail(email, otp);

            return res.send(
                "Otp has been sent to your registered Email address"
            );
        } else {
            throw new Error("Entered Email is not registered");
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

app.post("/update-password", async (req, res) => {
    try {
        const otp = req.body.otp;
        const email = req.body.adminEmail;
        const newPassword = req.body.newPassword;

        console.log(email + " " + otp);
        const check = await Otp.findOne({
            Email: email,
            Otp: otp,
        });

        if (check !== null) {
            console.log("ok");
            const query = { Email: email };
            const update = {
                $set: {
                    Password: newPassword,
                },
            };
            await User.findOneAndUpdate(query, update);

            res.status(201).send("Password updated successfully");
        } else {
            console.log("wrong");
            throw new Error("Wrong OTP");
        }
    } catch (error) {
        res.status(501).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
