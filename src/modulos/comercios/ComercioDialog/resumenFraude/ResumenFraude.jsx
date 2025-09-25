import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colores } from "../../../../estilos/colores";
import PhishingOutlinedIcon from "@mui/icons-material/PhishingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const ResumenFraude = ({ comercio }) => {
  return (
    <Box
      className="m-2 p-2 bg-white border-b-4"
      sx={{ borderColor: colores.celeste }}
    >
      {/* Titulo */}
      <Box className="flex items-center justify-between m-2">
        <Typography
          variant="h8"
          sx={{ color: colores.verdeclaro, fontWeight: "bold" }}
        >
          Resumen de fraude
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.alerta,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <PhishingOutlinedIcon />
        </Box>
      </Box>

      {/* Contenido */}
      {comercio && (
        <Box className="flex flex-col gap-2 ml-2 mt-2">
          <Box className="flex flex-row gap-3 w-full">
            <Box className="flex flex-col w-1/2">
              <Typography variant="body1">
                <AttachMoneyOutlinedIcon
                  className="text-sm font-bold"
                  sx={{ color: colores.rojo }}
                />
                40.000,00
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    color: colores.rojo,
                  }}
                >
                  <ArrowUpwardOutlinedIcon className="mr-1" />
                  0.1% mas que el mes anterior
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResumenFraude;
