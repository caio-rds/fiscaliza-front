import { useEffect, useState } from "react";
import { Avatar, Box, TextField, Typography, Button, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MapUser from "../userMap";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";

const serverURL = import.meta.env.VITE_SERVER_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 'fit-content',
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: 2,
  justifyContent: "center",
};

export default function MyProfile() {
  const [userPayload, setUser] = useState({
    username: "0",
    email: "0",
    phone: "0",
    address: {
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      lat: 0,
      lon: 0,
    },
    reports: [],
  });
  const [userEditing, setuserEditing] = useState(false);
  const [addressEditing, setAddressEditing] = useState(false);
  const [mapShow, setMapShow] = useState(false); 
  const { user } = useAuthContext();
  
  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}user/${user.username}`, {
          headers: {
            'Content-Type': 'application/json, charset=utf-8',
            "ngrok-skip-browser-warning": true,
            'Allow-Control-Allow-Origin': '*',
          },
          params: {
            posts: true            
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (    
    <Box className={"flexRow"} columnGap={"100px"} sx={{ height: "100%", width: "100%", paddingTop: '50px' }} alignItems={'flex-start'}>
      <Box className={"flexColumn"} rowGap={"20px"}>
        <Box className={"flexColumn"} rowGap={"10px"}>
          <Avatar sx={{ width: "220px", height: "220px" }} />
          <Typography variant={"h4"}>{userPayload.username}</Typography>
        </Box>
        <Box className={"flexColumn"} rowGap={"10px"}>
          {Object.keys(userPayload).map(
            (key, index) =>
              key !== "username" && key !="reports" && key !="address" && (
                <TextField
					key={index}
					label={key}
					name={key}
					value={userPayload[key]}
					// onChange={handleChange}
					variant="outlined"
					InputProps={{
						readOnly: !userEditing,
					}}
                />
              )
          )}        
          {
            userEditing ? (
              <Box className={'flexRow'} columnGap={'6px'} rowGap={'6px'}>
                <Button variant="contained">Salvar</Button>
                <Button variant="contained" onClick={() => setuserEditing(false)}>Cancelar</Button>
              </Box>
            ) : (
              <Button variant="contained" onClick={() => setuserEditing(true)}>Editar</Button>
            )
          }
        </Box>
      </Box>
      <Box className={'flexColumn'} rowGap={'6px'} marginTop={2} sx={{ width: 315 }}>
        <Card variant="outlined" sx={{ width: '100%' }}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography gutterBottom variant="h6" component="div" textAlign="left">
                Endereço
              </Typography>
              {
                userPayload.address === null ? (
                  <Typography gutterBottom variant="body2" component="div" textAlign="left">
                    Nenhum endereço cadastrado
                  </Typography>
                ) : (
                  <>
                    <Typography gutterBottom variant="h5" component="div" textAlign="left">
                      {userPayload.address.street}, {userPayload.address.number}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" textAlign="left">
                      {userPayload.address.district}, {userPayload.address.city} - {userPayload.address.state}
                    </Typography>
                  </>

                )
              }
            </Stack>
          </Box> 
          <Divider />
          <Box sx={{ p: 2 }} className={'flexRow'} columnGap={'10px'}>
            <Button variant="contained" onClick={() => setMapShow(true)} fullWidth>Ver no mapa</Button>
            <Button variant="contained" onClick={() => setAddressEditing(true)} fullWidth>Editar</Button>
          </Box>
        </Card>
        <Card variant="outlined" sx={{ width: '100%' }}>
			<Box sx={{ p: 2 }}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography gutterBottom variant="h5" component="div">
				Total de Reports
				</Typography>
				<Typography gutterBottom variant="h4" component="div">
				{userPayload.reports.length}
				</Typography>
			</Stack>
			{
				userPayload.reports.lenght > 0 ? (					
					<Typography color="text.secondary" variant="body2">
						Último report: {userPayload.reports[0].Description}
					</Typography>		
				) : (
					<Typography color="text.secondary" variant="body2">
            Nenhum report encontrado
          </Typography>			
				)
			}
			</Box>
			<Divider />
			<Box sx={{ p: 2 }}>
			<Button variant="contained" fullWidth>Ver todos</Button>
			</Box>
		</Card>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography gutterBottom variant="body1" component="div">
              Membro desde
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {new Date(userPayload.createdAt).getDate() + "/" + new Date(userPayload.createdAt).getMonth() + "/" + new Date(userPayload.createdAt).getFullYear()}
            </Typography>
          </Stack>
        </Box> 
      </Card>        
      </Box>
      
      {/* edit address */}
      <Modal open={addressEditing} onClose={() => setAddressEditing(false)} >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Editar Endereço
          </Typography>
          <TextField
            label="Street"
            name="street"
            value={ userPayload.address !== null ? userPayload.address.street : ""}
            //onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number"
            name="number"
            value={ userPayload.address !== null ? userPayload.address.number : ""}
            //onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="District"
            name="district"
            value={ userPayload.address !== null ? userPayload.address.district : ""}
            //onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={ userPayload.address !== null ? userPayload.address.city : ""}
            //onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            name="state"
            value={ userPayload.address !== null ? userPayload.address.state : ""}
            //onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" onClick={() => setAddressEditing(false)} fullWidth>
              Cancel
            </Button>
            <Button variant="contained" sx={{ marginLeft: 2 }} fullWidth>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
	<Modal open={mapShow} onClose={() => setMapShow(false)}>
		<Box sx={style}>
      { 
      userPayload.address !== null ? (
      <MapUser lat={parseFloat(userPayload.address.lat)} lon={parseFloat(userPayload.address.lon)} />
      ) : (
        <Typography variant="h6" gutterBottom>
          Nenhum endereço cadastrado
        </Typography>
      )
      }
			<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
				<Button variant="contained" onClick={() => setMapShow(false)} fullWidth>
					Fechar
				</Button>
			</Box>
		</Box>
	</Modal>
      
    </Box>
  );
}
