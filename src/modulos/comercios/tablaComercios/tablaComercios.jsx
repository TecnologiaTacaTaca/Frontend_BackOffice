import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { colores } from "../../../estilos/colores";

const columns = [
  { id: "Razon_Social", label: "Razon Social", minWidth: 200 },
  { id: "CUIT", label: "CUIT", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 120 },
  { id: "Cliente_Desde", label: "Fecha Alta", minWidth: 120 },
];

const TableComercios = ({
  dataTable,
  setShowComerciosDialog,
  setDetalleComercio,
}) => {
  const columna_acciones = (row) => {
    return (
      <TableCell>
        <IconButton
          onClick={() => {
            setDetalleComercio(row);
            setShowComerciosDialog(true);
          }}
          aria-label="delete"
          sx={{ color: colores.celeste }}
        >
          <DashboardOutlinedIcon />
        </IconButton>
      </TableCell>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 350px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderBottom: "2px solid black",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key={"acciones"}
                sx={{
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "2px solid black",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, index) => {
              // Generar el campo estado basado en Billetera
              const rowWithEstado = {
                ...row,
                estado:
                  row.Billetera === "Activa" ? "Habilitado" : "Deshabilitado",
              };

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${row.CUIT}-${index}`}
                >
                  {columns.map((column) => {
                    const value = rowWithEstado[column.id];
                    return (
                      <TableCell key={`${column.id}-${index}`}>
                        {value}
                      </TableCell>
                    );
                  })}
                  {columna_acciones(row)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComercios;
