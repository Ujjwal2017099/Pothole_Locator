import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import customMarkerIcon from "../assets/locationIcon.png";

const locations = [
    { id: 1, name: "Location 1", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Location 2", lat: 34.0522, lng: -118.2437 },
    { id: 3, name: "Location 3", lat: 40.7128, lng: -74.006 },
];

const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const Search = ({height,width}) => {
    return (
        <MapContainer
            center={[37.7749, -122.4194]}
            zoom={2}
            style={{ height: height, width: width }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={customIcon}
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Search;
