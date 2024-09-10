import { useState } from "react";
import TopBar from "../../components/topbar";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SwitchButton from "../../components/switch";
import PropTypes from "prop-types";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@mui/icons-material/Info";
import useAuthContext from "../../hooks/useAuthContext";

const urls = [
  { name: "Início", url: "/", icon: <HomeIcon />, user: false },
  { name: "Reports", url: "/reports", icon: <ReportIcon />, user: true },
  {
    name: "Criar Report",
    url: "/reports/new",
    icon: <AddBoxIcon />,
    user: true,
  },
  {
    name: "Procurar Report",
    url: "/reports/search",
    icon: <SearchIcon />,
    user: true,
  },
  { name: "Sobre Nós", url: "/about", icon: <Info />, user: false },
];

export function HomeTemplate({ children }) {
  const { user, logout } = useAuthContext();

  const setUrl = (url) => {
    window.location.href = url;
  };

  const [sideMenu, setSideMenu] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    if (newOpen) {
      setSideMenu(newOpen);
    }

    if (sideMenu === false) {
      setSideMenu(true);
    } else {
      setSideMenu(false);
    }
  };

  return (
    <>
      <TopBar setSideMenu={toggleDrawer} />

      <Drawer
        open={sideMenu}
        onClose={toggleDrawer(false)}
        sx={{ width: "250px", height: "300px" }}
      >
        <List>
          {urls.map((url, index) =>
            user && url.user ? (
              <ListItemButton
                key={index}
                onClick={url.url === "/sair" ? logout : () => setUrl(url.url)}
              >
                <ListItemIcon>{url.icon}</ListItemIcon>
                <ListItemText primary={url.name} />
              </ListItemButton>
            ) : !url.user ? (
              <ListItemButton key={index} onClick={() => setUrl(url.url)}>
                <ListItemIcon>{url.icon}</ListItemIcon>
                <ListItemText primary={url.name} />
              </ListItemButton>
            ) : null
          )}

          <ListItem>
            <SwitchButton />
          </ListItem>
        </List>
      </Drawer>

      {children}
    </>
  );
}

HomeTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
