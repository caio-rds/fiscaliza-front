import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
  InputLabel,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import useAxios from "../../utils/axiosConfig";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MapIcon from "@mui/icons-material/Map";
import { useDeviceType } from "../../hooks/useDeviceType";
import { CreateReportMap } from "../../components/createReportMap";

export default function ReportRegister() {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    typeReport: "",
    description: "",
    anonymousReport: false,
    street: "",
    district: "",
    latitude: "",
    longitude: "",
  });
  const [typeReports, setTypeReports] = useState([]);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [openSnack, setOpenSnack] = useState(false);

  const isMobile = useDeviceType();

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const userLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data.address);
              updateField("street", data.address.road || "");
              updateField("district", data.address.suburb || "");
              updateField("latitude", lat);
              updateField("longitude", lon);
            })
            .catch((error) =>
              setAlert({ message: error.message, type: "error" })
            );
        },
        () => setAlert({ message: "Erro ao obter localização", type: "error" }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setAlert({ message: "Geolocalização não suportada", type: "error" });
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await axiosInstance.get("/report/types");
        setTypeReports(data);
      } catch (error) {
        setAlert({
          message: "Erro ao carregar tipos de ocorrências",
          type: "error",
        });
      }
    };

    if (!typeReports.length) fetchTypes();
  }, [axiosInstance, typeReports]);

  const useDebounce = (func, delay) => {
    const debounceRef = useRef();

    return useCallback(
      (...args) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => func(...args), delay);
      },
      [func, delay]
    );
  };

  const handleSearchAddress = async (event) => {
    const query = event.target.value;
    if (query.length < 3) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const reverseGeoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
            );
            const reverseGeoData = await reverseGeoResponse.json();

            const state = reverseGeoData?.address?.state;
            if (!state) {
              throw new Error("Não foi possível determinar o estado.");
            }

            const searchResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(
                query
              )}&state=${encodeURIComponent(state)}&limit=5&addressdetails=1`
            );
            const searchData = await searchResponse.json();

            console.log(searchData);

            setSuggestedAddresses(
              searchData.map((addr) => ({
                id: addr.place_id,
                street: `${addr.name || ""}, ${
                  addr.address.city || addr.address.city_district || ""
                }.`,
                district: addr.address.suburb || "",
                lat: addr.lat,
                lon: addr.lon,
              }))
            );
          } catch (error) {
            setAlert({ message: error.message, type: "error" });
          }
        },
        () =>
          setAlert({
            message: "Erro ao obter localização",
            type: "error",
          }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setAlert({ message: "Geolocalização não suportada", type: "error" });
    }
  };

  const handleSearchDebounce = useDebounce(handleSearchAddress, 200);

  const submitReport = async () => {
    const {
      typeReport,
      description,
      anonymousReport,
      street,
      district,
      latitude,
      longitude,
    } = formData;

    if (
      !typeReport ||
      !description ||
      !street ||
      !district ||
      !latitude ||
      !longitude
    ) {
      setAlert({ message: "Preencha todos os campos", type: "error" });
      setOpenSnack(true);
      return;
    }

    try {
      const payload = {
        type: typeReport,
        description,
        anonymous: anonymousReport ? 1 : 0,
        street,
        district,
        lat: latitude,
        lon: longitude,
      };
      await axiosInstance.post("/report/", payload);
      setAlert({
        message: "Ocorrência registrada com sucesso",
        type: "success",
      });
    } catch (error) {
      setAlert({ message: "Erro ao enviar ocorrência", type: "error" });
    }
    setOpenSnack(true);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "60px" }} className={"flexColumn"}>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {alert.message && (
          <Alert severity={alert.type} variant="filled">
            {alert.message}
          </Alert>
        )}
      </Snackbar>

      <Box
        sx={{
          width: { xs: "90%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <FormControl>
          <InputLabel>Tipo de Ocorrência</InputLabel>

          <Select
            value={formData.typeReport}
            onChange={(e) => updateField("typeReport", e.target.value)}
            label="Tipo de Ocorrência"
          >
            {typeReports
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Descrição"
          multiline
          rows={4}
          fullWidth
          placeholder="Descreva a ocorrência"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        <Box
          textAlign="left"
          className="flexRow"
          justifyContent="flex-start"
          sx={{
            gap: "16px",
          }}
        >
          <FormLabel>Relato Anônimo</FormLabel>

          <RadioGroup
            row
            value={formData.anonymousReport}
            onChange={() =>
              updateField("anonymousReport", !formData.anonymousReport)
            }
          >
            <FormControlLabel value={false} control={<Radio />} label="Sim" />
            <FormControlLabel value={true} control={<Radio />} label="Não" />
          </RadioGroup>
        </Box>

        <Box className="flexRow" columnGap="12px">
          <Autocomplete
            sx={{ width: "100%" }}
            options={suggestedAddresses}
            value={suggestedAddresses.find(
              (option) => option.street === formData.street
            )}
            getOptionLabel={(option) => option.street}
            noOptionsText="Nenhum endereço encontrado"
            renderOption={(props, option) => (
              <li {...props}>
                <Typography variant="subtitle1">{option.street}</Typography>
              </li>
            )}
            onInputChange={(e) => {
              updateField("street", e.target.value);
              handleSearchDebounce(e);
            }}
            renderInput={(params) => <TextField {...params} label="Endereço" />}
            onChange={(e, value) => {
              if (value) {
                updateField("street", value.street);
                updateField("district", value.district);
                updateField("latitude", value.lat);
                updateField("longitude", value.lon);
              }
            }}
          />

          {isMobile === "mobile" ? (
            <Button onClick={userLocation} variant="contained">
              <LocationOnIcon />
            </Button>
          ) : (
            <CreateReportMap />
          )}
        </Box>

        <Box className="flexRow" columnGap="10px">
          <Button onClick={submitReport} variant="contained" fullWidth>
            Enviar
          </Button>

          <Button variant="contained" color="secondary" fullWidth>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
