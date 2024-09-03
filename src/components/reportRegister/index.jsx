import { Box, FormControl, MenuItem, Select, Button, InputLabel, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Autocomplete, Typography, Alert } from "@mui/material";
// import { sub } from "date-fns";
import { useCallback, useEffect, useState, useRef } from "react"
import useAxios from "../../utils/axiosConfig"
import Snackbar2 from '@mui/material/Snackbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';



export default function ReportRegister() {
  const [typeReports, setTypeReports] = useState([]);
  const [typeReport, setTypeReport] = useState("");
  const [description, setDescription] = useState("");
  const [anonymousReport, setAnonymousReport] = useState(false);
  const [street, setStreet] = useState("");  
  const [district, setDistrict] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const axiosInstance = useAxios();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);

  const userLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;          
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
          fetch(url)
            .then(response => {
              console.log(lat, lon);
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }        
              return response.json();
            })
            .then(data => {
              console.log(data.address);
              setStreet(data.address.road);
              setDistrict(data.address.suburb);
              setLatitude(lat);
              setLongitude(lon);
            })
            .catch(error => {        
              console.error('Houve um problema com a requisição fetch:', error);
            });
        },
        (error) => {
          console.error('Erro ao obter a localização:', error);
          setError('Não foi possível obter a localização. Por favor, verifique as permissões e tente novamente.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocalização não é suportada pelo seu navegador.');
    }
  }

  useEffect(() => {
    const fetchTypes = async () => {
      const request = await axiosInstance.get('/report/types');
      setTypeReports(request.data);
    }
    if (typeReports.length === 0) {
      fetchTypes();
    }    
  },[axiosInstance, typeReports]);

  const useDebounce = (func, delay) => {
    const inDebounce = useRef();
  
    const debounce = useCallback(
      function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce.current);
        inDebounce.current = setTimeout(() => func.apply(context, args), delay);
      },
      [func, delay]
    );
  
    return debounce;
  };

  const handleSearchAddress = (event) => {
    if (event.target.value.length < 3) {
      return;
    }

    const query = event.target.value;
    const url = `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(query)}&city=Rio+de+Janeiro&limit=5&addressdetails=1`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }        
        return response.json();
      })
      .then(data => {
        let result = [];        
        const number = query.match(/\d+/g);
        let resultNumber = "";
        if (number) {
          resultNumber = number[0];
        }
        data.map((address) => result.push({
          id: address.place_id,
          street: address.address.road + (resultNumber ? ", " + resultNumber : ""),
          district: address.address.suburb,
          lat: address.lat,
          lon: address.lon
        }));
        setSuggestedAddresses(result);

      })
      .catch(error => {        
        console.error('Houve um problema com a requisição fetch:', error);
      });
  }

  const handleSearchDebounce = useDebounce(handleSearchAddress, 500);

  const renderOption = (props, option) => {
    return (                    
      <li key={option.id} {...props} className={"flexColumn"} style={{alignItems: 'flex-start', paddingLeft: '20px'}}>
        <Typography variant="subtitle1">{option.street}</Typography>
        <Typography variant="caption">{option.district}, Rio de Janeiro</Typography>
      </li>      
    );
  };

  const submitReport = async () => {
    try {
      let payload = {
        anonymous: anonymousReport ? 1 : 0,
        description: description,
        type: typeReport,
        street: street,
        district: district,
        lat: latitude,
        lon: longitude
      };
      Object.keys(payload).forEach(key => payload[key] === "" || payload[key] === null || payload[key] === undefined ? setError('Preencha todos os campos.') && setOpenSnack(true) : null);
      const response = await axiosInstance.post('/report/', payload);
      setSuccess('Ocorrência registrada com sucesso.');
      console.log(response.data);
    } catch (error) {
      console.error('There was an error with the request:', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (    
    <Box sx={{ width: '100%',marginTop: '60px'}} className={'flexColumn'}>      
      <Snackbar2 open={openSnack} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <div>
          {error && <Alert onClose={handleClose} severity="error" variant="filled">{error}</Alert>}
          {success && <Alert onClose={handleClose} severity="success" variant="filled">{success}</Alert>}
        </div>
      </Snackbar2>
      <Box sx={{width: {xs: '90%', md: '30%'}, display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
        <FormControl sx={{ display: 'flex', rowGap: '10px', flexDirection: 'column' }}>
          <InputLabel id="type-report-label" htmlFor="type-report-label">Tipo de Ocorrência</InputLabel>
          <Select
            labelId="type-report-label"
            id="type-report"
            value={typeReport}
            label="Tipo de Ocorrência"
            onChange={(e) => setTypeReport(e.target.value)}
          >            
            {typeReports.sort((a, b) => a.name.localeCompare(b.name)).map((type) => (
              <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="textfield-description-report"
          label="Descrição"
          multiline
          rows={4}
          fullWidth
          placeholder="Descreva a ocorrência"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Box textAlign={'left'} className={'flexRow'} justifyContent={'flex-start'}>
          <FormLabel id="anonymous-report-label" sx={{marginLeft: '2px'}}>Relato Anônimo</FormLabel>
          <RadioGroup
            aria-labelledby="anonymous-report-label"
            defaultValue={anonymousReport}
            name="radio-buttons-group"
            sx={{ display: 'flex', flexDirection: 'row', padding: '10px' }}
            onChange={() => setAnonymousReport(!anonymousReport)}
          >
              <FormControlLabel value="false" control={<Radio />} label="Sim" /> 
              <FormControlLabel value="true" control={<Radio />} label="Não" />
          </RadioGroup>
        </Box>


        
        <Box className={'flexRow'} columnGap={'10px'} sx={{width: '100%', height: "fit-content"}}>
          <Autocomplete      
            id="street"
            noOptionsText="Nenhum endereço encontrado"
            options={suggestedAddresses}
            value={suggestedAddresses.find((option) => option.street === street)}
            inputValue={street}
            sx={{ width: '100%' }}         
            getOptionLabel={(option) => option.street}
            renderOption={renderOption}
            onInputChange={(e) => {e.target.value ? setStreet(e.target.value) : "", handleSearchDebounce(e)}}
            renderInput={(params) => <TextField {...params} label="Endereço" />}
            onChange={(event, value) => {
              if (value) {
                setStreet(value.street);
                setDistrict(value.district);
                setLatitude(value.lat);
                setLongitude(value.lon);
              }
            }}
          />
          <Button onClick={userLocation} variant="contained" sx={{ display: "flex", height: "100%"}}><LocationOnIcon /></Button>
          <Button variant="contained" sx={{display: "flex", height: "100%"}}><MapIcon /></Button>
        </Box>          
        <Box className={'flexRow'} columnGap={'10px'} sx={{width: '100%'}}>
          <Button onClick={submitReport} variant="contained" color="primary" fullWidth>Enviar</Button>
          <Button variant="contained" color="secondary" fullWidth>Cancelar</Button>
        </Box>          
      </Box>    
    </Box>    
  );
}