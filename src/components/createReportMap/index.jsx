import { useState } from "react";
import { GenericMap } from "../genericMap";
import { Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export function CreateReportMap({ updateField, updateSuggestedAddresses }) {
  const [showMap, setShowMap] = useState(false);

  const handleOpenMap = () => {
    setShowMap(!showMap);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleLocationSelect = async (location) => {
    try {
      const { lat, lng } = location;
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
  
      const street = data.address.road || "";
      const district = data.address.suburb || "";
  
      updateField("street", street);
      updateField("district", district);
      updateField("latitude", lat);
      updateField("longitude", lng);

      setShowMap(false);
  
      updateSuggestedAddresses((prevAddresses) => [
        ...prevAddresses,
        {
          id: Date.now(),
          street: street,
          district: district,
          lat: lat,
          lon: lng,
        },
      ]);
    } catch (error) {
      console.error("Erro ao obter o endereço: ", error);
    }
  };
  

  return (
    <div>
      <Button variant="contained" onClick={handleOpenMap}>
        <MapIcon />
      </Button>

      {showMap && (
        <div
          style={{
            width: "99dvw",
            height: "100dvh",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 1,
            backgroundColor: "#fff",
          }}
        >
          <Button
            onClick={handleCloseMap}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 401,
              backgroundColor: "#fff",
              borderRadius: "50%",
              minWidth: "32px",
              minHeight: "32px",
              padding: 0,
            }}
          >
            <CloseIcon />
          </Button>

          <GenericMap onLocationSelect={handleLocationSelect} />
        </div>
      )}
    </div>
  );
}

CreateReportMap.propTypes = {
  updateField: PropTypes.func.isRequired,
  updateSuggestedAddresses: PropTypes.func.isRequired,
};
