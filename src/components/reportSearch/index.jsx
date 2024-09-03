import { Box, TextField, Button, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useAxios from "../../utils/axiosConfig"
import useAuthContext from '../../hooks/useAuthContext';

const containerStyle = {
    width: "400px",
    height: "400px",
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

export default function SearchReport({id_report}) {
    const axiosInstance = useAxios();
    const { user } = useAuthContext();
    const [id, setId] = useState(id_report);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);

    const searchReport = async () => {
        try {
            const response = await axiosInstance.get(`/report/${id}`);
            setReport(response.data);
            setError(null);
        } catch (error) {
            setReport(null);
            setError("Report não encontrado.");
        }
    }
    
    return (
        <Box className={{xs: 'flexColumn', md: 'flexRow'}}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{padding: '10px 0'}} columnGap={'10px'}>
                <TextField label="Procurar Report" value={id} type="number" variant="outlined" onChange={(e) => setId(e.target.value)} sx={{width: '300px'}} inputProps={{ min: 0 }} />
                <Button variant="outlined" startIcon={<SearchIcon />} sx={{height: '55px'}} onClick={searchReport}>Pesquisar</Button>
            </Box>
            {
                error !== null ? (
                    <Alert severity="error" variant="filled">{error}</Alert>
                ) : null
            }
            {
                report !== null ?
                (   
                    <Box className={'flexRow'} columnGap={'30px'} height={'100%'}>
                        <MapContainer
                            center={{lat: report.lat, lon: report.lon}}
                            zoom={14}
                            style={containerStyle}       
                            scrollWheelZoom={false}
                            disableDefaultUI={true}
                            ref={mapRef => {
                                if (mapRef) {
                                    mapRef.flyTo([report.lat, report.lon], 14);
                                    for (let i = 14; i < 17; i++) {
                                        setTimeout(() => {
                                            mapRef.flyTo([report.lat, report.lon], i);
                                        }, 1000);
                                    }
                                }
                            }}                                             
                        >
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[report.lat, report.lon]}>
                                <Popup>
                                    {report.description}
                                </Popup>
                            </Marker>
                        </MapContainer> 

                        <Box className={'flexColumn'} sx={{padding: '10px 0'}} rowGap={'20px'}>                                  
                            <TextField label="Descrição" value={report.description} multiline rows={6} variant="outlined" sx={{width: '610px'}} disabled />                            
                            <Box className={'flexRow'} columnGap={'10px'}>
                                <TextField label="Tipo" value={report.type} variant="outlined" sx={{width: '300px'}} disabled/>
                                <TextField label="Usuário" value={report.anonymous ? "Anônimo" : report.username} variant="outlined" sx={{width: '300px'}} disabled />
                            </Box>
                            <Box className={'flexRow'} columnGap={'10px'}>
                                <TextField
                                    label="Data" 
                                    value={new Date(report.created_at).toLocaleDateString() + " - " + new Date(report.created_at).toLocaleTimeString()}
                                    variant="outlined" 
                                    sx={{width: '300px'}} 
                                    disabled />
                                <TextField 
                                    label="Endereço" 
                                    value={report.street + ", " + report.district} 
                                    variant="outlined" 
                                    sx={{width: '300px'}} 
                                    disabled />                            
                            </Box>
                            <Box className={'flexRow'} columnGap={'10px'}>
                                <TextField label="ID" value={report.id} variant="outlined" sx={{width: '100px'}} disabled />
                                <TextField label="Latitude" value={report.lat} variant="outlined" sx={{width: '245px'}} disabled />
                                <TextField label="Longitude" value={report.lon} variant="outlined" sx={{width: '245px'}} disabled />
                            </Box>
                            {
                                user === report.username ? (
                                    <Box className={'flexRow'} columnGap={'10px'} justifyContent={'center'}>
                                        <Button variant="contained" sx={{width: '200px'}}>Excluir</Button>
                                        <Button variant="contained" sx={{width: '200px'}}>Editar</Button>
                                    </Box>
                                ) : null
                            }                      
                        </Box>
                    </Box>
                ) : null
            }

        </Box>
    );
}

SearchReport.propTypes = {
    id_report: PropTypes.number,
};