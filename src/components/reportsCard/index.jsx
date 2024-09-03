import { Box, Button, Typography } from "@mui/material";
import { differenceInSeconds } from "date-fns";
import { Card, CardContent, CardActions } from "@mui/material";
import PropTypes from 'prop-types';
import useThemeContext from "../../hooks/useThemeContext";

export default function DisplayReports({ reports, current_report, set_current_report, openModal }) {

  const { mode } = useThemeContext();
  

  function calculateTimeDifference(startDate, endDate) {
    let diffInSeconds = differenceInSeconds(endDate, startDate);
    const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
    diffInSeconds -= diffInDays * 3600 * 24;

    const diffInHours = Math.floor(diffInSeconds / 3600);
    diffInSeconds -= diffInHours * 3600;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    diffInSeconds -= diffInMinutes * 60;

    const parts = [];
    if (diffInDays > 0) parts.push(`${diffInDays}d`);
    if (diffInHours > 0) parts.push(`${diffInHours}h`);
    if (diffInMinutes > 0) parts.push(`${diffInMinutes}m`);
    if (diffInSeconds > 0) parts.push(`${diffInSeconds}s`);

    return parts.join(", ");
  }

  return (
    
    <Box sx={{ height: '600px', maxHeight: '600px', width: "26%", overflow: 'auto', rowGap: '10px', padding: '10px 30px 30px 30px', justifyContent: 'flex-start', scrollbarWidth: 'none', alignItems: 'center' }} className={"flexColumn"}>
      {
        reports.map((report) => {
          return (
            <Card key={report.id} 
              onClick={() => set_current_report(report)}
              sx={{ 
                "&:hover": {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s',
                  cursor: 'pointer',
                  boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
                },
                transform: report.id === current_report.id ? 'scale(1.1)' : 'scale(1)',
                boxShadow: report.id === current_report.id ? '5px 5px 5px rgba(0,0,0,0.5)' : '',
                width: 420,                   
                minHeight: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-around', 
                textAlign: 'left',
                background: mode === "light" ? "#f5f5f5" : "#333",
              }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {report.type}
                </Typography>                                    
                <Typography variant="body2">
                  {calculateTimeDifference(new Date(report.created_at), new Date())} atrás
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    openModal();
                    set_current_report(report);
                  }}
                >
                  Ver Detalhes
                </Button>
              </CardActions>
            </Card>
          );
        })
      }
    </Box>      
  );
}

DisplayReports.propTypes = {
  reports: PropTypes.array.isRequired,
  current_report: PropTypes.object.isRequired,
  set_current_report: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};