import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-toastify/dist/ReactToastify.css";
import TableComercios from "./tablaComercios/tablaComercios";
import ComercioDialog from "./ComercioDialog/ComercioDialog";
import { getComercios } from "./servicios/comercios.services";

const Comercios = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableOriginal, setDataTableOriginal] = useState([]);
  const [filtros, setFiltros] = useState({
    cuit: "",
    estado: "",
    fechaAlta: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showComerciosDialog, setShowComerciosDialog] = useState(false);
  const [detalleComercio, setDetalleComercio] = useState({});

  useEffect(() => {
    getDataTable();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, dataTableOriginal]);

  useEffect(() => {
    setPage(0);
  }, [filtros]);

  const getDataTable = async () => {
    const comercios = await getComercios();
    setDataTable(comercios);
    setDataTableOriginal(comercios);
  };

  const aplicarFiltros = () => {
    let datosFiltrados = [...dataTableOriginal];

    // Filtro por CUIT
    if (filtros.cuit.trim() !== "") {
      datosFiltrados = datosFiltrados.filter(
        (comercio) =>
          comercio.CUIT &&
          comercio.CUIT.toString().includes(filtros.cuit.trim())
      );
    }

    // Filtro por Estado
    if (filtros.estado !== "") {
      datosFiltrados = datosFiltrados.filter((comercio) => {
        const estado =
          comercio.Billetera === "Activa" ? "Habilitado" : "Deshabilitado";
        return estado.toLowerCase() === filtros.estado.toLowerCase();
      });
    }

    // Filtro por Fecha Alta
    if (filtros.fechaAlta !== "") {
      datosFiltrados = datosFiltrados.filter((comercio) => {
        if (!comercio.Cliente_Desde) return false;

        // Comparar directamente las fechas en formato YYYY-MM-DD
        return comercio.Cliente_Desde === filtros.fechaAlta;
      });
    }

    setDataTable(datosFiltrados);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderFiltros = () => {
    return (
      <Box className="flex items-end gap-6 mb-6 mt-6 w-full">
        <Box className="flex items-center gap-6">
          <TextField
            id="cuit-input"
            label="CUIT"
            value={filtros.cuit}
            onChange={(e) => handleFiltroChange("cuit", e.target.value)}
            inputProps={{
              maxLength: 11,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            sx={{ minWidth: 200 }}
            placeholder="Ingrese CUIT (máx. 11 dígitos)"
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              id="estado-select"
              value={filtros.estado}
              label="Estado"
              onChange={(e) => handleFiltroChange("estado", e.target.value)}
            >
              <MenuItem value="Habilitado">Habilitado</MenuItem>
              <MenuItem value="Deshabilitado">Deshabilitado</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="fecha-alta"
            label="Fecha Alta"
            type="date"
            value={filtros.fechaAlta}
            onChange={(e) => handleFiltroChange("fechaAlta", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ minWidth: 200 }}
          />
        </Box>
        <Box className="justify-center w-full">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#35B6B4",
              color: "white",
              "&:hover": { backgroundColor: "#2a908f" },
            }}
            disabled={!filtros.cuit && !filtros.estado && !filtros.fechaAlta}
            onClick={() =>
              setFiltros({
                cuit: "",
                estado: "",
                fechaAlta: "",
              })
            }
          >
            Limpiar Filtros
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="bg-white p-6 w-full">
        {renderFiltros()}
        <Divider />
        {dataTable.length > 0 ? (
          <>
            <TableComercios
              setShowComerciosDialog={setShowComerciosDialog}
              setDetalleComercio={setDetalleComercio}
              dataTable={dataTable.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
            />
            <TablePagination
              component="div"
              count={dataTable.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
              sx={{
                borderTop: "2px solid black",
                backgroundColor: "#f5f5f5",
              }}
            />
          </>
        ) : (
          <Box className="flex items-center justify-center h-full">
            <Typography variant="h6">No hay comercios</Typography>
          </Box>
        )}
      </Box>
      <ComercioDialog
        open={showComerciosDialog}
        comercio={detalleComercio}
        onClose={() => {
          setShowComerciosDialog(false);
          setDetalleComercio({}); // Limpiar los datos del comercio
        }}
      />
    </LocalizationProvider>
  );
};

export default Comercios;
