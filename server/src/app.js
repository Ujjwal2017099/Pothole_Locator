const express = require('express')
require('./connection/connection')
const Location = require('./models/location')
const Image = require('./models/image')
const User = require('./models/user')

async function findLocationsNearby(latitude, longitude) {
    try {
        const result = await Location.find({
            coordinates: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100, // in meters
                },
            },
        });

        console.log("Locations within 100 meters:", result);
    } catch (error) {
        console.error("Error:", error.message);
    } 
}


// async function saveLocation(name, latitude, longitude) {
//     try {
//         const newLocation = new Location({
//             name: name,
//             coordinates: {
//                 type: "Point",
//                 coordinates: [longitude, latitude],
//             },
//         });

//         await newLocation.save();
//         console.log("Location saved successfully:", newLocation);
//     } catch (error) {
//         console.error("Error:", error.message);
//     } finally {
//         mongoose.disconnect();
//     }
// }

// // Example usage
// const locationName = "Sample Location";
// const locationLatitude = 12.971598;
// const locationLongitude = 77.594562;

// saveLocation(locationName, locationLatitude, locationLongitude);
