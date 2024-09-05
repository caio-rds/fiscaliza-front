import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

const containerStyle = {
  width: "100%",
  height: "650px",
  borderRadius: "8px",
  boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
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

export default function MapUser({ lat, lon }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      maxHeight={"100%"}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={15}
        style={containerStyle}
        scrollWheelZoom={true}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker style={{ transform: "scale(1.0)" }} position={[lat, lon]}>
          <Popup>Seu Endereço</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

MapUser.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
