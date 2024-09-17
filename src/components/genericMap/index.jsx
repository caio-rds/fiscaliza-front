import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";

export function GenericMap({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker />
    </MapContainer>
  );
}

GenericMap.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};
