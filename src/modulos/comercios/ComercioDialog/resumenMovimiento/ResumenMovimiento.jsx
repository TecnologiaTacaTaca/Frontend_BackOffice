import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ResumenMovimiento = ({ comercio }) => {
  return (
    <Box>
      <Typography variant="h6">Resumen de movimientos</Typography>
      {comercio && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Cantidad Total:</strong>{" "}
            {comercio.Movimientos_CantidadTotal || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Últimos 30 días:</strong>{" "}
            {comercio.Movimientos_CantidadUltimos30Dias || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Primera Fecha:</strong>{" "}
            {comercio.Movimientos_FechaPrimera || "N/A"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumenMovimiento;
