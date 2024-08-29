import "./style.css";
import { AppBar, Button, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useThemeContext from "../../hooks/useThemeContext";
import PropTypes from "prop-types";
import LogoWhite from "../../assets/logo3.png";
import LogoBlack from "../../assets/logo3black.png";
import useAuthContext from "../../hooks/useAuthContext";



export default function TopBar({ setSideMenu }) {
  const { mode } = useThemeContext();  
  const { user } = useAuthContext();

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
            src={mode === "light" ? LogoBlack : LogoWhite}
            alt="logo"
            style={{ height: "50px" }}
          />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Fiscaliza
          </Typography>
          <Box display="flex" columnGap="10px">
            { user != undefined ? 
            <Typography variant="h6" component="div"> Hello, {user.username} </Typography> :
            <>
              <Button
                color="inherit"
                onClick={() => (window.location.href = "/login")}
              >
                Logar
              </Button>

              <Button
                color="inherit"
                variant="outlined"
                onClick={() => (window.location.href = "/register")}
              >
                Cadastrar
              </Button>
            </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


TopBar.propTypes = {
  setSideMenu: PropTypes.func.isRequired,
};