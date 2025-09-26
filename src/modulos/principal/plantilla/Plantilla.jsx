import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./marco/Header/Header";
import Sidebar from "./marco/Sidebar/Sidebar";
import Footer from "./marco/Footer/Footer";
import { Box, Button } from "@mui/material";
import { UserContext } from "../../../usuario_sesion/UserContext";
import { loginAzure } from "../../../usuario_sesion/servicios/ServicioAutenticacionAzure";

const Plantilla = ({ children }) => {
  const { user, isLoading } = React.useContext(UserContext);
  const { instance } = useMsal();
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  // Función para login manual
  const handleManualLogin = async () => {
    console.log("Intentando login manual...");
    try {
      await loginAzure(instance);
      console.log("Login manual completado.");
    } catch (error) {
      console.error("Error en login manual:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
      >
        <Header user={user} isCollapsed={isCollapsed} />
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
        <Box
          sx={{
            ml: isCollapsed ? "64px" : "256px",
            mt: "80px",
            mb: "64px",
            transition: "margin-left 0.3s ease",
            minHeight: "calc(100vh - 144px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!user ? (
            <Button variant="contained" onClick={handleManualLogin}>
              Login Manual con Microsoft
            </Button>
          ) : (
            children
          )}
        </Box>
        <Footer
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isCollapsed={isCollapsed}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Plantilla;
