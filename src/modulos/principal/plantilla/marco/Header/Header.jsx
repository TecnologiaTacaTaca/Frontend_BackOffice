import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../../../usuario_sesion/UserContext";

const Header = ({ isCollapsed }) => {
  const { user, isLoading } = React.useContext(UserContext);
  const { instance } = useMsal();
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (isLoading || !user) {
    return null;
  }

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    instance.logoutPopup();
    setAnchorEl(null);
  };

  const location = useLocation();
  let sectionTitle = "Inicio";
  if (location.pathname.startsWith("/fraude")) {
    sectionTitle = "Fraude";
  } else if (location.pathname.startsWith("/reportes")) {
    sectionTitle = "Reportes";
  }

  return (
    <AppBar
      position="fixed"
      className="bg-[#005F5A] text-white "
      sx={{
        zIndex: 1200,
        height: "80px",
      }}
    >
      <Toolbar
        className="bg-[#005F5A] font-bold text-xl flex justify-between items-center"
        sx={{
          minHeight: "80px",
          height: "80px",
        }}
      >
        <div className="flex items-center">
          <Typography
            variant="h5"
            className="ml-4"
            sx={{
              position: "absolute",
              left: isCollapsed ? "80px" : "270px",
              transition: "left 0.3s ease",
            }}
          >
            {sectionTitle}
          </Typography>
        </div>
        <div className="flex items-center">
          <img
            src="/static/img/Logo-color-TT.svg"
            alt="Logo"
            className="h-8 w-12 mr-2"
          />
          <Typography variant="h6">BACK OFFICE</Typography>
        </div>
        <div className="flex items-center">
          <IconButton onClick={handleMenu}>
            <Avatar src={user?.photo || "/static/img/defaultUserLogo.png"} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{user?.name || "Usuario desconocido"}</MenuItem>
            <MenuItem onClick={handleLogout} className="text-red-500">
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
