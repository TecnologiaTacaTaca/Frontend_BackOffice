import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EnviosComercio = ({ comercio }) => {
  return (
    <Box>
      <Typography variant="h6">Envios</Typography>
      {comercio && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Dirección:</strong> {comercio.Direccion_Calle}{" "}
            {comercio.Direccion_Numero}
          </Typography>
          <Typography variant="body1">
            <strong>Piso/Depto:</strong>{" "}
            {comercio.Direccion_Piso_Departamento || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Código Postal:</strong>{" "}
            {comercio.Direccion_Codigo_Postal || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Localidad:</strong>{" "}
            {comercio.Direccion_Partido_Localidad || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Provincia:</strong>{" "}
            {comercio.Direccion_Estado_Provincia || "N/A"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EnviosComercio;
