import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { colores } from "../../../../estilos/colores";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const PosicionConsolidadaComercio = ({ comercio }) => {
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
          Posicion consolidada
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.verdeDolar,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <AccountBalanceWalletOutlinedIcon />
        </Box>
      </Box>

      {comercio && (
        <Box className="flex flex-col gap-2 m-2">
          <Box className="flex flex-row gap-3 w-full">
            <Box className="flex flex-col w-1/2">
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                INGRESOS
              </Typography>
              <Typography variant="h6">
                <AttachMoneyOutlinedIcon
                  className="text-sm font-bold"
                  sx={{ color: colores.verdeDolar }}
                />
                {(comercio.Transacciones_MontoTotal * 3)
                  .toFixed(2)
                  ?.toLocaleString() || "N/A"}
              </Typography>
            </Box>
            <Box className="flex flex-col w-1/2">
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                EGRESOS
              </Typography>
              <Typography variant="h6">
                <AttachMoneyOutlinedIcon
                  className="text-sm font-bold"
                  sx={{ color: colores.rojo }}
                />
                {(comercio.Transacciones_MontoMesAnterior * 6.17)
                  .toFixed(2)
                  ?.toLocaleString() || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PosicionConsolidadaComercio;
