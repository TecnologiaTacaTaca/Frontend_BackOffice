import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./paginas/marco/Header";
import Sidebar from "./paginas/marco/Sidebar";
import Footer from "./paginas/marco/Footer";
import { useMsal } from "@azure/msal-react";
import { Box } from "@mui/material";
import { UserContext } from "../../usuario_sesion/UserContext";

const Plantilla = ({ children }) => {
  const { user } = React.useContext(UserContext);

  // Eliminar simulación: user ahora viene del contexto

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
      >
        <Header
          user={user}
          isCollapsed={isCollapsed}
          sx={{
            ml: isCollapsed ? "64px" : "256px",
            transition: "margin-left 0.3s ease",
          }}
        />
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
        <Box
          sx={{
            ml: isCollapsed ? "64px" : "256px",
            mt: "64px",
            mb: "64px",
            transition: "margin-left 0.3s ease",
            minHeight: "calc(100vh - 128px)",
          }}
        >
          {children}
        </Box>
        <Footer
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          sx={{
            width: isCollapsed ? "calc(100% - 64px)" : "calc(100% - 256px)",
            ml: isCollapsed ? "64px" : "256px",
            transition: "all 0.3s ease",
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Plantilla;
