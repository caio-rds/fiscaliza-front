import { Box, Typography, Button } from "@mui/material";
import DisplayReports from "../report";
import MapReport from "../map";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import useAxios from "../../utils/axiosConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: 2,
  justifyContent: "space-around",
};

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(serverURL + "report");
        
        setReports(response.data);
        if (response.data.length > 0) {
          setCurrentReport(response.data[0]);
        }        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ marginTop: "30px", filter: open ? "blur(5px)" : {} }}>
      
      <Typography variant={"h2"} textAlign={"center"}>Relatórios</Typography>       
      
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        {
          reports.length === 0 ? 
            <Typography variant={"h4"} textAlign={"center"}>Nenhum relatório encontrado</Typography>
          :
          ( 
          <>
            <MapReport reports={reports} current_report={{lat: parseFloat(currentReport.lat), lon: parseFloat(currentReport.lon)}} />
            <DisplayReports
              reports={reports}
              current_report={currentReport}
              set_current_report={setCurrentReport}
              openModal={handleOpen}           
            />
          </>)
          
        }
        
      </Box>
      <Modal
        open={open}
        onClose={handleClose}        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={"flexColumn"}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {currentReport.type}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {currentReport.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentReport.street}, {currentReport.district}, {currentReport.city} - {currentReport.state}
          </Typography>
          <Typography id="modal-modal-details" sx={{ mt: 2 }}>
            {currentReport.created_at} by:{" "}
            {currentReport.anonymous ? "Anônimo" : currentReport.username}
          </Typography>          
          <Button variant="contained" onClick={handleClose}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
