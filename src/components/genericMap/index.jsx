import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";

export function GenericMap({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao pegar localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo navegador");
    }
  }, []);

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, 13);
      }
    }, [position, map]);

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
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {position && <LocationMarker />}
    </MapContainer>
  );
}

GenericMap.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};
