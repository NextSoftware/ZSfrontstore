import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(
  id: number,
  date: string,
  nif: number,
  total: number,
  invoice: string
) {
  return { id, date, nif, total, invoice };
}

const rows = [
  createData(1234, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1235, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1236, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1237, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1238, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1239, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1231, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1232, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(1233, "23-22-2022", 550000123, 128.95, "Ver fatura"),
  createData(12312, "23-22-2022", 550000123, 128.95, "Ver fatura"),
];

function Invoices(props:any) {
  return (
    <>
      <Typography className="heading-user">Faturas</Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="table-user"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Data da Fatura</TableCell>
              <TableCell>NIF</TableCell>
              <TableCell>Valor total</TableCell>
              <TableCell align="center">Fatura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row?.Date.toString().split("T")[0]}</TableCell>
                <TableCell>{row?.Customer?.NIF}</TableCell>
                <TableCell>{Math.round(row?.TaxedPrice * 100) / 100}€</TableCell>
                <TableCell align="center">
                  <Button className="btn-text">{"Ver Fatura"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Invoices;
