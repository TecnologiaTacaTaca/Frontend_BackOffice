import React from "react";
import { Checkbox, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TableFraude = ({ dataTable }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          paddingLeft: "10px",
          paddingRight: "10px",
          minWidth: "auto",
          marginBottom: "2vh",
          "&:hover": { backgroundColor: "#35B6B4" },
        }}
      >
        <span>Marcar como no fraude</span>
      </Button>
      <TableContainer
        component={Paper}
        className="w-auto p-2 border-2 border-black rounded-md"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell component="th">ID</TableCell>
              <TableCell component="th">First name</TableCell>
              <TableCell component="th">Last name</TableCell>
              <TableCell component="th" align="right">
                Age
              </TableCell>
              <TableCell component="th">Email</TableCell>
              <TableCell component="th">Phone</TableCell>
              <TableCell component="th">Number Card</TableCell>
              <TableCell component="th">Address</TableCell>
              <TableCell component="th">Score</TableCell>
              <TableCell component="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell colSpan={1}>{row.firstName}</TableCell>
                <TableCell colSpan={1}>{row.lastName}</TableCell>
                <TableCell colSpan={1} align="right">
                  {row.age}
                </TableCell>
                <TableCell colSpan={1}>{row.email}</TableCell>
                <TableCell colSpan={1}>{row.phone}</TableCell>
                <TableCell colSpan={1}>{row.numberCard}</TableCell>
                <TableCell colSpan={1}>{row.address}</TableCell>
                <TableCell colSpan={1}>
                  <div className="bg-green-600 w-7 h-5 text-center">
                    <span className="text-white">0.0</span>
                  </div>
                </TableCell>
                <TableCell colSpan={1}>
                  <Button
                    sx={{
                      borderRadius: "100%",
                      padding: "4px",
                      backgroundColor: "#F0F0F0",
                      minWidth: "auto",
                      marginLeft: "10px",
                      width: "32px",
                      height: "32px",
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <VisibilityIcon sx={{ color: "green" }} />
                  </Button>
                  <Button
                    sx={{
                      borderRadius: "4px",
                      border: "2px solid red",
                      backgroundColor: "white",
                      marginLeft: "10px",
                      color: "red",
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <span>Fraude</span>
                  </Button>
                  <Button
                    sx={{
                      borderRadius: "4px",
                      border: "2px solid blue",
                      backgroundColor: "white",
                      marginLeft: "10px",
                      color: "blue",
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <span>No Fraude</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableFraude;
