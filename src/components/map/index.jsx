import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Defina o estilo do container do mapa
const containerStyle = {
  width: "600px",
  height: "600px",
  borderRadius: "8px",
};

// Defina o centro do mapa
const center = {
  lat: -22.8777019,
  lon: -43.4575497,
};

// Defina as coordenadas das marcações
const markers = [
  { id: 1, position: { lat: -22.8777019, lng: -43.4575497 } },
  { id: 2, position: { lat: -22.8921655, lng: -43.4547179 } },
  { id: 3, position: { lat: -22.8827893, lng: -43.466438 } },
];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapReport({ report }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
      width={"100%"}
    >
      <MapContainer
        center={{ lat: report.lat, lon: report.lon }}
        zoom={15}
        style={containerStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.keys(report).length > 0 && (
          <Marker position={{ lat: report.lat, lon: report.lon }}>
            <Popup>
              <Box>
                <Box>
                  <strong>Report</strong>
                </Box>
                <Box>
                  <strong>Username:</strong> {report.username}
                </Box>
                <Box>
                  <strong>Report:</strong> {report.report}
                </Box>
                <Box>
                  <strong>Street:</strong> {report.street}
                </Box>
                <Box>
                  <strong>District:</strong> {report.district}
                </Box>
                <Box>
                  <strong>City:</strong> {report.city}
                </Box>
                <Box>
                  <strong>State:</strong> {report.state}
                </Box>
                <Box>
                  <strong>Created at:</strong>{" "}
                  {new Date(report.created_at).toLocaleString()}
                </Box>
              </Box>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
}
