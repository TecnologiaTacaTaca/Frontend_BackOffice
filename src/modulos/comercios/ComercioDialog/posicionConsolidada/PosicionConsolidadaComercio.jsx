import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PosicionConsolidadaComercio = ({ comercio }) => {
  return (
    <Box>
      <Typography variant="h6">Posición consolidada</Typography>
      {comercio && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Cuenta Remunerada:</strong>{" "}
            {comercio.Suscripto_Cuenta_Remunerada ? "Sí" : "No"}
          </Typography>
          <Typography variant="body1">
            <strong>Cumple Ley FACTA:</strong>{" "}
            {comercio.Titular_Cumple_Ley_FACTA ? "Sí" : "No"}
          </Typography>
          <Typography variant="body1">
            <strong>Estado:</strong>{" "}
            {comercio.Billetera === "Activa" ? "Habilitado" : "Deshabilitado"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PosicionConsolidadaComercio;
