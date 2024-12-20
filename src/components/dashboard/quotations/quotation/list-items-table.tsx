"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Stack, Typography, useTheme } from "@mui/material";

const createData = (
  name: string,
  desc: string,
  unitAmount: number,
  qty: number,
  units: string
) => {
  return { name, desc, unitAmount, qty, units };
};

const rows = [
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4 Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4 Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4 Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
  createData(
    "Lenovo ThinkPad T14 Laptop",
    "Intel 11th Gen Core i5-1135G7, 512 GB SSD, 8GB DDR4",
    6156000,
    1,
    "Piece(s)"
  ),
];

const ListItemsTable = () => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Card}
      sx={{ width: "100%", overflow: "scroll", maxHeight: 600 }}
    >
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="list-items table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              S/N
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Unit Amount (UGX)</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount (UGX)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index * row.qty + row.unitAmount}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell sx={{ maxWidth: "260px", textAlign: "justify" }}>
                <Stack>
                  <Typography>{row.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {row.desc}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{row.unitAmount.toLocaleString()}</TableCell>
              <TableCell>
                {row.qty} {row.units}
              </TableCell>
              <TableCell>
                {(row.qty * row.unitAmount).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListItemsTable;
