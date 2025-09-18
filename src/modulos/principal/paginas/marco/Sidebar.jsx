import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../usuario_sesion/UserContext";

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const { user, isLoading } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState({});

  if (isLoading || !user) {
    return (
      <Drawer
        variant="permanent"
        sx={
          {
            /* estilos */
          }
        }
      >
        <List />
      </Drawer>
    );
  }

  const handleClick = (modulo) => {
    setOpen((prev) => ({ ...prev, [modulo]: !prev[modulo] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 64 : 256,
        height: "100%",
        zIndex: 1300,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 64 : 256,
          position: "fixed",
          height: "100%",
          transition: "width 0.3s ease",
          zIndex: 1300,
          borderWidth: 0,
        },
      }}
    >
      <List className="bg-[#002F2D] dark:bg-[#002F2D] text-[#35B6B4] h-full">
        <ListItem>
          <IconButton onClick={toggleCollapse}>
            <MenuIcon className="text-teal-300" />
          </IconButton>
          {!isCollapsed && <ListItemText primary="MENÚ" />}
        </ListItem>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon className="text-teal-300" />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Inicio" />}
        </ListItem>
        {user?.modulos?.map((modulo) => (
          <React.Fragment key={modulo.nombre_mostrado}>
            <ListItem
              button
              onClick={() => handleClick(modulo.nombre_mostrado)}
            >
              <ListItemIcon>
                {modulo.nombre_mostrado === "Reportes" ? (
                  <FolderIcon className="text-[#35B6B4]" />
                ) : (
                  <DashboardIcon className="text-[#35B6B4]" />
                )}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary={modulo.nombre_mostrado} />
              )}
              {!isCollapsed &&
                (open[modulo.nombre_mostrado] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                ))}
            </ListItem>
            {!isCollapsed && (
              <Collapse
                in={open[modulo.nombre_mostrado]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {modulo.submodulos?.map((sub) => (
                    <ListItem
                      button
                      key={sub.nombre_mostrado_front}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(sub.ruta)}
                    >
                      <ListItemText primary={sub.nombre_mostrado_front} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
