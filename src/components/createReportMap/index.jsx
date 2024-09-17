import { useState } from "react";
import { GenericMap } from "../genericMap";
import { Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

export function CreateReportMap() {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpenMap = () => {
    setShowMap(true);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMap(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenMap}>
        <MapIcon />
      </Button>

      {showMap && (
        <div>
          <GenericMap onLocationSelect={handleLocationSelect} />
        </div>
      )}

      {selectedLocation && (
        <div>
          <p>
            Localização selecionada:{" "}
            {`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lng}`}
          </p>
        </div>
      )}
    </div>
  );
}
