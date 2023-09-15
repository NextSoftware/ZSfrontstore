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

function createData(id: number, date: string, state: string, stock: string) {
  return { id, date, state, stock };
}

const rows = [
  createData(1234, "23-22-2022", "Processada", "Indisponível"),
  createData(1235, "23-22-2022", "Processada", "Indisponível"),
  createData(1236, "23-22-2022", "Processada", "Indisponível"),
];

function OrderRequests(props:any) {
  return (
    <>
      <Typography className="heading-user">
        Pedidos de encomenda (produtos sem stock)
      </Typography>

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
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row?.Date.toString().split("T")[0]}</TableCell>
                <TableCell>{row.Checkout_Types.Name}</TableCell>
                <TableCell>{"Sem Stock"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderRequests;
