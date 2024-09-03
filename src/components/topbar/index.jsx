import "./style.css";
import { AppBar, Button, Box, Divider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useThemeContext from "../../hooks/useThemeContext";
import PropTypes from "prop-types";
import Person from "@mui/icons-material/Person";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LogoWhite from "../../assets/logo3.png";
import LogoBlack from "../../assets/logo3black.png";
import useAuthContext from "../../hooks/useAuthContext";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";



export default function TopBar({ setSideMenu }) {
  const { mode } = useThemeContext();  
  const { user, logout } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const options = [
    { name: "Profile", func: () => window.location.href = "/profile", icon: <Person />},
    { name: "Deslogar", func: () => logout(), icon: <DisabledByDefaultIcon />},
  ]


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
            <>
              {/* <Typography variant="h6" component="div"> Hello, {user.username} </Typography> */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {user.username}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography variant="h6" component="div" sx={{ p: 2 }}>
                  Hello, {user.username}
                </Typography>
                <Divider />
                {options.map((option, index) => (
                  <MenuItem key={index} onClick={option.func}>
                    {option.icon}
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
            :
            <>
              <Button
                variant="outlined"
                onClick={() => (window.location.href = "/login")}
                sx={{
                  '&:hover': {
                    backgroundColor: mode === "light" ? "#556cd6" : "",
                    color: mode === "light" ? "#fff" : "#556cd6",               
                  },
                }}
              >
                Logar
              </Button>

              <Button variant="contained" onClick={() => (window.location.href = "/register")}>Cadastrar</Button>
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