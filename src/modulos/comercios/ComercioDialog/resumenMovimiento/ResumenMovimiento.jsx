import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import { colores } from "../../../../estilos/colores";

const ResumenMovimiento = ({ comercio }) => {
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
          Resumen de movimientos
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.azul,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <CurrencyExchangeOutlinedIcon />
        </Box>
      </Box>
      {/* Contenido */}
      {comercio && (
        <Box className="flex items-center flex-row gap-2 m-2">
          <Box className="flex flex-col w-1/2">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Cantidad Total:
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
            >
              {comercio.Movimientos_CantidadTotal || "N/A"}
            </Typography>
          </Box>
          <Box className="flex flex-col w-1/2">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Últimos 30 días:
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
            >
              {comercio.Movimientos_CantidadUltimos30Dias || "N/A"}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResumenMovimiento;
