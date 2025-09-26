import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DetalleComercio from "./detalleComercio/DetalleComercio";
import ResumenTransacciones from "./resumenTransacciones/ResumenTransacciones";
import ResumenFraude from "./resumenFraude/ResumenFraude";
import EnviosComercio from "./envios/EnviosComercio";
import ResumenMovimiento from "./resumenMovimiento/ResumenMovimiento";
import PosicionConsolidadaComercio from "./posicionConsolidada/PosicionConsolidadaComercio";

const ComercioDialog = ({ comercio, onClose, open }) => {
  const [comercioData, setComercioData] = useState(null);

  useEffect(() => {
    setComercioData(comercio);
  }, [comercio]);

  const handleClose = () => {
    onClose(); // Cerrar el diálogo
    setComercioData(null); // Limpiar los datos del comercio
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "80vh",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle>
        <Box className="flex items-center justify-between">
          <Typography variant="h6">
            {comercioData?.Razon_Social || "Cargando..."}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#f0f0f0",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* Detalle de comercio */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              <DetalleComercio comercio={comercioData} />
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  marginBottom: "1vh",
                }}
              >
                <ResumenTransacciones comercio={comercioData} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <ResumenFraude comercio={comercioData} />
              </Box>
            </Box>
          </Box>
          {/* Posicion consolidada */}

          <Box
            sx={{
              width: "100%",
            }}
          >
            <PosicionConsolidadaComercio comercio={comercioData} />

            {/* Resumen de transacciones, fraude y envios */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <EnviosComercio comercio={comercioData} />
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <ResumenMovimiento comercio={comercioData} />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ComercioDialog;
