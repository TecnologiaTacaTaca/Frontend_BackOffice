import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { colores } from "../../../../estilos/colores";

const EnviosComercio = ({ comercio }) => {
  return (
    <Box
      className="m-2 p-2 bg-white border-b-4 h-full"
      sx={{ borderColor: colores.celeste }}
    >
      {/* Titulo */}
      <Box className="flex items-center justify-between m-2">
        <Typography
          variant="h8"
          sx={{ color: colores.verdeclaro, fontWeight: "bold" }}
        >
          Resumen de envios
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.lila,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <LocalShippingOutlinedIcon />
        </Box>
      </Box>

      {/* Contenido */}
      <Box className="flex flex-col gap-2 ml-2 mt-2">
        <Typography variant="h8" sx={{ fontWeight: "bold" }}>
          Cantidad de envios: 12
        </Typography>
      </Box>
    </Box>
  );
};

export default EnviosComercio;
