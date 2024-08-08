import { Box, Typography, Button } from "@mui/material";
import DisplayReports from "../report";

export default function Reports() {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Typography variant={"h2"} textAlign={"center"}>
        Relatórios
      </Typography>
      
      <Button
        variant={"contained"}
        onClick={() => (window.location.href = "reports/new")}
      >
        Adicionar Relatório
      </Button>
      <DisplayReports />
    </Box>
  );
}
