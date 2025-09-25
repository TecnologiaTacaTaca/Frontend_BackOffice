import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { colores } from "../../../../estilos/colores";

const DetalleComercio = ({ comercio }) => {
  return (
    <Box
      className="m-2 p-2 bg-white border-b-4"
      sx={{ borderColor: colores.celeste }}
    >
      <Box className="flex items-center justify-between m-2 mb-10">
        <Typography
          variant="h8"
          sx={{ color: colores.verdeclaro, fontWeight: "bold" }}
        >
          Datos del comercio
        </Typography>
        <Box
          sx={{
            backgroundColor: colores.verdeclaro,
            color: colores.blanco,
            borderRadius: "50%",
            padding: 1,
          }}
        >
          <BusinessCenterOutlinedIcon />
        </Box>
      </Box>
      {comercio && (
        <Box className="mt-2 p-2 flex flex-col gap-2">
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>CUIT:</strong> {comercio.CUIT}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Nombre Fantasía:</strong> {comercio.Nombre_Fantasia}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Tipo:</strong> {comercio.Tipo}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Rubro:</strong> {comercio.Rubro}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Teléfono:</strong> {comercio.Telefono}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Email:</strong> {comercio.Email}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Cliente desde:</strong> {comercio.Cliente_Desde}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
          >
            <strong>Dirección:</strong> {comercio.Direccion_Calle}{" "}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DetalleComercio;
