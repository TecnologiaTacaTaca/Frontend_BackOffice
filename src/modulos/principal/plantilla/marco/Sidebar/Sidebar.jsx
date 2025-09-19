import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../../usuario_sesion/UserContext";

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

  const getIcon = (nombre) => {
    switch (nombre) {
      case "Inicio":
        return <HomeIcon className="text-[#35B6B4]" />;
      case "Comercios":
        return <StoreIcon className="text-[#35B6B4]" />;
      case "Reportes":
        return <FolderIcon className="text-[#35B6B4]" />;
      case "Fraude":
        return <SecurityIcon className="text-[#35B6B4]" />;
      default:
        console.log("Cayó en default para nombre:", nombre);
        return <DashboardIcon className="text-[#35B6B4]" />;
    }
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
      <List className="bg-[#002F2D] dark:bg-[#002F2D] text-[#35B6B4] h-full ">
        <ListItem
          button
          onClick={toggleCollapse}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            marginBottom: "35px",
            marginTop: "12px",
          }}
        >
          <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 40 }}>
            <MenuIcon className="text-teal-300" />
          </ListItemIcon>
          {!isCollapsed && <ListItemText className="pt-[3px]" primary="MENÚ" />}
        </ListItem>
        {user?.modulos?.map((modulo) => (
          <React.Fragment key={modulo.nombre_mostrado}>
            <ListItem
              button
              onClick={() => {
                if (modulo.submodulos && modulo.submodulos.length > 0) {
                  handleClick(modulo.nombre_mostrado);
                } else {
                  navigate(modulo.ruta);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                padding: "8px 16px",
              }}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 40 }}>
                {getIcon(modulo.nombre_mostrado)}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary={modulo.nombre_mostrado} />
              )}
              {!isCollapsed &&
                modulo.submodulos &&
                modulo.submodulos.length > 0 &&
                (open[modulo.nombre_mostrado] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                ))}
            </ListItem>
            {!isCollapsed &&
              modulo.submodulos &&
              modulo.submodulos.length > 0 && (
                <Collapse
                  in={open[modulo.nombre_mostrado]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {modulo.submodulos.map((sub) => (
                      <ListItem
                        button
                        key={sub.nombre_mostrado_front}
                        sx={{
                          pl: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "8px 16px 8px 48px",
                        }}
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
