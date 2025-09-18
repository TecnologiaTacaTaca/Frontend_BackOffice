import React from "react";
import { Box, Typography, Switch } from "@mui/material";

const Footer = ({ darkMode, toggleDarkMode }) => {
  return (
    <Box
      className="bg-[#F0F0F0] dark:#949494 p-2 flex justify-between items-center fixed bottom-0 w-full"
      sx={{ zIndex: 1100 }}
    >
      <Typography className="text-white bg-[#949494] px-3 py-1 rounded-full ml-2">
        Versión 1.0
      </Typography>
      <Box className="flex items-center gap-2">
        <span className="text-yellow-500">☀️</span> {/* Light mode icon */}
        <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
        <span className="text-blue-900">🌙</span> {/* Dark mode icon */}
      </Box>
    </Box>
  );
};

export default Footer;
