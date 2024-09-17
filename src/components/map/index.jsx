import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "640px",
  borderRadius: "8px",
  boxShadow: "4px 4px 10px rgba(0,0,0,0.5)",
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapReport({ reports, current_report }) {
  const [center, setCenter] = useState(current_report);
  const [zoom, setZoom] = useState(16);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([current_report.lat, current_report.lon], 14);
      for (let i = 14; i < 17; i++) {
        setTimeout(() => {
          mapRef.current.flyTo([current_report.lat, current_report.lon], i);
        }, 1000);
      }
      setCenter({ lat: current_report.lat, lon: current_report.lon });
    }
    if (current_report.lat === 0 && current_report.lon === 0) {
      setZoom(2);
    }
  }, [current_report]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
      width={"50%"}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={containerStyle}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((report) => (
          <Marker
            style={{ transform: "scale(1.0)" }}
            key={report.id}
            position={[report.lat, report.lon]}
          >
            <Popup>{report.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

MapReport.propTypes = {
  reports: PropTypes.array.isRequired,
  current_report: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }).isRequired,
};
