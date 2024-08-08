import "./style.css";
import { AppBar, Button, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useThemeContext from "../../hooks/useThemeContext";

export default function TopBar({ setSideMenu }) {
  const { mode } = useThemeContext();

  console.log(mode);
  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "90px" }}>
      <AppBar position="static" sx={{ height: "100%" }}>
        <Toolbar sx={{ height: "100%" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={setSideMenu(true)}
          >
            <MenuIcon sx={{ color: mode === "light" ? "#333" : "#fff" }} />
          </IconButton>
          <img
            src={mode === "light" ? "logo3black.png" : "logo3.png"}
            alt="logo"
            style={{ height: "50px" }}
          />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Fiscaliza
          </Typography>
          <Box display="flex" columnGap="10px">
            <Button
              color="inherit"
              onClick={() => (window.location.href = "login")}
            >
              Logar
            </Button>

            <Button
              color="inherit"
              variant={"outlined"}
              onClick={() => (window.location.href = "register")}
            >
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
