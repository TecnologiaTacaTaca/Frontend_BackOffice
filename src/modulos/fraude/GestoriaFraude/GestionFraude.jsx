import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableFraude from "./table/TableFraude";

const GestionFraude = () => {
  const [fecha, setFecha] = useState(dayjs());
  const [limpiarVisados, setLimpiarVisados] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (limpiarVisados) {
      toastify("Sin Funcionalidad", "Funcionalidad en desarrollo");
    }
  }, [limpiarVisados]);

  useEffect(() => {
    setDataTable(getDataTable());
  }, []);

  const getDataTable = () => {
    return [
      {
        id: 1,
        lastName: "Snow",
        firstName: "Jon",
        age: 35,
        email: "jon@snow.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 2,
        lastName: "Lannister",
        firstName: "Cersei",
        age: 42,
        email: "cersei@lannister.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 3,
        lastName: "Lannister",
        firstName: "Jaime",
        age: 45,
        email: "jaime@lannister.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 4,
        lastName: "Stark",
        firstName: "Arya",
        age: 16,
        email: "arya@stark.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 5,
        lastName: "Targaryen",
        firstName: "Daenerys",
        age: null,
        email: "daenerys@targaryen.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 6,
        lastName: "Melisandre",
        firstName: null,
        age: 150,
        email: "melisandre@melisandre.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 7,
        lastName: "Clifford",
        firstName: "Ferrara",
        age: 44,
        email: "clifford@ferrara.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 8,
        lastName: "Frances",
        firstName: "Rossini",
        age: 36,
        email: "frances@rossini.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
      {
        id: 9,
        lastName: "Roxie",
        firstName: "Harvey",
        age: 65,
        email: "roxie@harvey.com",
        phone: "1234567890",
        numberCard: "1234567890",
        address: "1234567890",
      },
    ];
  };

  const toastify = (title, message) => {
    toast.warning(
      <Box className="flex flex-col w-full pl-4">
        <Box className="flex items-center gap-2 w-full">
          <Typography variant="h4">{title}</Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Typography variant="h6">{message}</Typography>
        </Box>
      </Box>
    );
  };

  const handleVerInfoScore = () => {
    toastify("Sin Funcionalidad", "Funcionalidad en desarrollo");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="bg-white p-6 w-full ">
        <Box className="flex items-end justify-start gap-6 mb-6 mt-6">
          <DatePicker
            value={fecha}
            label="Fecha"
            className="border border-gray-400  rounded-sm"
            onChange={setFecha}
            format="DD/MM/YYYY"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={limpiarVisados}
                onChange={(e) => setLimpiarVisados(e.target.checked)}
              />
            }
            className="border border-gray-400 rounded w-64 p-1.5 flex justify-between"
            label="Limpiar visados"
            labelPlacement="start"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#35B6B4",
              color: "white",
              "&:hover": { backgroundColor: "#2a908f" },
              marginBottom: "5px",
              marginLeft: "24px",
            }}
            onClick={handleVerInfoScore}
          >
            Ver Info del Score
          </Button>
        </Box>
        <TableFraude dataTable={dataTable} />
      </Box>
    </LocalizationProvider>
  );
};

export default GestionFraude;
