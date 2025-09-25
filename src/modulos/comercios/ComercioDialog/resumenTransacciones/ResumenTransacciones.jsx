import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colores } from "../../../../estilos/colores";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";

const ResumenTransacciones = ({ comercio }) => {
  const [esGanancia, setEsGanancia] = useState("=");
  const [gananciaCantidad, setGananciaCantidad] = useState(true);

  const calcularPorcentajeDiferencia = (montoActual, montoAnterior) => {
    if (!montoAnterior || montoAnterior === 0) {
      return montoActual > 0 ? "100.00" : "0.00";
    }
    return (((montoActual - montoAnterior) / montoAnterior) * 100).toFixed(2);
  };

  useEffect(() => {
    calcularGananciaCantidad(
      comercio.Transacciones_MontoTotal,
      comercio.Transacciones_MontoMesAnterior
    );
    calcularGanancia(
      comercio.Transacciones_MontoTotal,
      comercio.Transacciones_MontoMesAnterior
    );
  }, [comercio]);

  const calcularGanancia = (monto1, monto2) => {
    if (
      comercio.Transacciones_MontoTotal >
      comercio.Transacciones_MontoMesAnterior
    ) {
      setEsGanancia(">");
    } else if (
      comercio.Transacciones_MontoTotal <
      comercio.Transacciones_MontoMesAnterior
    ) {
      setEsGanancia("<");
    } else {
      setEsGanancia("=");
    }
  };

  const calcularGananciaCantidad = (monto1, monto2) => {
    if (
      comercio.Transacciones_CantidadTotal >=
      comercio.Transacciones_CantidadMesAnterior
    ) {
      setGananciaCantidad(true);
    } else {
      setGananciaCantidad(false);
    }
  };

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
          Resumen de transacciones
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.celeste,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <AttachMoneyOutlinedIcon />
        </Box>
      </Box>

      {/* Contenido */}
      {comercio && (
        <Box className="flex flex-col gap-2 m-2">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Monto:
          </Typography>
          <Box className="flex flex-row gap-3 w-full">
            <Box className="flex flex-col w-1/2">
              <Typography variant="h6">Total</Typography>
              <Typography variant="body1">
                <AttachMoneyOutlinedIcon
                  className="text-sm font-bold"
                  sx={{ color: colores.verdeDolar }}
                />
                {comercio.Transacciones_MontoTotal?.toLocaleString() || "N/A"}
                {esGanancia !== "=" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      color:
                        esGanancia === ">" ? colores.verdeDolar : colores.rojo,
                    }}
                  >
                    {esGanancia === ">" ? (
                      <ArrowUpwardOutlinedIcon />
                    ) : (
                      <ArrowDownwardOutlinedIcon />
                    )}
                    {calcularPorcentajeDiferencia(
                      comercio.Transacciones_MontoTotal,
                      comercio.Transacciones_MontoMesAnterior
                    )}
                    % mas que el mes anterior
                  </Typography>
                ) : null}
              </Typography>
            </Box>
            <Box className="flex flex-col w-1/2">
              <p>Mes Anterior</p>
              <Typography variant="body1">
                <AttachMoneyOutlinedIcon
                  className="text-sm font-bold"
                  sx={{ color: colores.verdeDolar }}
                />
                {comercio.Transacciones_MontoMesAnterior?.toLocaleString() ||
                  "N/A"}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Cantidad:
          </Typography>
          <Box className="flex flex-row gap-3 w-full">
            <Box className="flex flex-col w-1/2">
              <Typography variant="h6">Total</Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
              >
                <EqualizerOutlinedIcon sx={{ color: colores.verdeclaro }} />
                {comercio.Transacciones_CantidadTotal?.toLocaleString() ||
                  "N/A"}
              </Typography>
              {gananciaCantidad !== false ? (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    color:
                      gananciaCantidad === true
                        ? colores.verdeDolar
                        : colores.rojo,
                  }}
                >
                  {gananciaCantidad === true ? (
                    <ArrowUpwardOutlinedIcon />
                  ) : (
                    <ArrowDownwardOutlinedIcon />
                  )}
                  {calcularPorcentajeDiferencia(
                    comercio.Transacciones_CantidadTotal,
                    comercio.Transacciones_CantidadMesAnterior
                  )}
                  % mas que el mes anterior
                </Typography>
              ) : null}
            </Box>
            <Box className="flex flex-col w-1/2">
              <Typography variant="h6">Mes Anterior</Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
              >
                <EqualizerOutlinedIcon sx={{ color: colores.verdeclaro }} />
                {comercio.Transacciones_CantidadMesAnterior?.toLocaleString() ||
                  "N/A"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResumenTransacciones;
