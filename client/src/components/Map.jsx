import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import customMarkerIcon from "../assets/locationIcon.png";



const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const Search = ({height,width,locations,zoom=2,center=[20.5937, 78.9629]}) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
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
