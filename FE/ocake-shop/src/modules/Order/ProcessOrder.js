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
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";

function createData(name, quantity, processState, state, deliveryDate) {
  return { name, quantity, processState, state, deliveryDate };
}

const initialRows = [
  createData(
    "Bánh kem vani  kích thước 20cm",
    1,
    "Đã xử lý",
    "Đang xử lý",
    "12/6/2024"
  ),
  createData(
    "Bánh kem socola kích thước 24cm",
    1,
    "Đã xử lý",
    "Chưa xử lý",
    "11/6/2024"
  ),
  createData(
    "Bánh kem dứa kích thước 26cm",
    1,
    "Đã xử lý",
    "Chưa xử lý",
    "11/6/2024"
  ),
  createData(
    "Bánh kem socola kích thước 18cm",
    1,
    "Đã xử lý",
    "Chưa xử lý",
    "12/6/2024"
  ),
  createData(
    "Bánh kem bắp kích thước 24cm",
    1,
    "Chưa xử lý",
    "Chưa xử lý",
    "12/6/2024"
  ),
];

export default function ProcessOrder() {
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Trạng thái xử lý đơn</TableCell>
                <TableCell align="center">Trạng thái làm bánh</TableCell>
                <TableCell align="center">Thời gian giao hàng</TableCell>
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
                  <TableCell align="center">{row.processState}</TableCell>
                  <TableCell align="center">{row.state}</TableCell>
                  <TableCell align="center">{row.deliveryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              padding: "0.5rem 2rem",
              border: "solid 2px #E82451",
              color: "#000",
              backgroundColor: "#FFDFE7",
              "&:~hover": {
                backgroundColor: "#F7BBCA !important",
              },
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
