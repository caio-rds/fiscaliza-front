import { useState } from "react";
import TopBar from "../../components/topbar";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SwitchButton from "../../components/switch";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";

const urls = [
  { name: "Início", url: "/" },
  { name: "Reports", url: "/reports" },
  { name: "Profile", url: "/profile" },
  { name: "Sair", url: "/sair" },
];

const setUrl = (url) => {
  window.location.href = url;
};

export function HomeTemplate({ children }) {

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
          {urls.map((url, index) => (
            <ListItem key={index} onClick={() => setUrl(url.url)}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={url.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <SwitchButton />
        </List>
      </Drawer>

      {children}
    </>
  );
}


HomeTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};