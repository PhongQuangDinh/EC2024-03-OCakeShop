"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../layout";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";

function createData(name, quantity, deliveryDate) {
  return { name, quantity, deliveryDate };
}

const initialRows = [
  createData(
    "Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate",
    1,
    "12/6/2024"
  ),
  createData(
    "Bánh kem xanh cho bé trai | 1 tầng | 24cm | Phô mai",
    1,
    "11/6/2024"
  ),
  createData("Bánh kem 8/3 | 1 tầng | 22cm | Chocolate", 1, "11/6/2024"),
  createData("Bánh kem 14/2 | 1 tầng | 20cm | Vani", 1, "12/6/2024"),
];

export default function Checkout() {
  const [rows, setRows] = useState(initialRows);
  const [value, setValue] = useState(0);
  const [movingRowIndex, setMovingRowIndex] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const moveRow = (index, direction) => {
    const newRows = [...rows];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newRows.length) {
      const temp = newRows[targetIndex];
      newRows[targetIndex] = newRows[index];
      newRows[index] = temp;
      setRows(newRows);
      setMovingRowIndex(targetIndex);
      setTimeout(() => setMovingRowIndex(null), 300);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
          height: "100vh",
          padding: "7% 10%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Tabs
          sx={{
            width: "100%",
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#E82451",
            },
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            sx={{
              width: "100%",
              maxWidth: "50%",
              backgroundColor: "#fff",
              color: "#000",
              "&.Mui-selected": {
                color: "#E82451",
              },
            }}
            label="Đang xử lý"
          />
          <Tab
            sx={{
              width: "100%",
              maxWidth: "50%",
              backgroundColor: "#fff",
              color: "#000",
              "&.Mui-selected": {
                color: "#E82451",
              },
            }}
            label="Đã hoàn thành"
          />
        </Tabs>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Xác nhận giao hàng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      movingRowIndex === index
                        ? "translateY(10px)"
                        : "translateY(0)",
                  }}
                >
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <IconButton
                        disableRipple="true"
                        onClick={() => moveRow(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        disableRipple="true"
                        onClick={() => moveRow(index, "down")}
                        disabled={index === rows.length - 1}
                      >
                        <ArrowDownward />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.deliveryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
