"use client"
import React, { useState } from 'react';
import { Button, Box, Typography, Tab, Tabs } from '@mui/material';
import Layout from "../layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, quantity, deliveryDate) {
  return { name, quantity, deliveryDate };
}

const handleConfirm = () => {
  // Handle save changes
  // console.log('Changes saved:', formData);
};

const initialRows = [
  createData(
    "Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate",
    1
  ),
  createData(
    "Bánh kem xanh cho bé trai | 1 tầng | 24cm | Phô mai",
    1
  ),
  createData("Bánh kem 8/3 | 1 tầng | 22cm | Chocolate", 1),
  createData("Bánh kem 14/2 | 1 tầng | 20cm | Vani", 1),
];

export default function PurchaseOrderProcess() {
  const [rows, setRows] = useState(initialRows);
  const [value, setValue] = useState(0);

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
      <Box sx={{
        background: "#fff",
        gap: "20px",
        marginTop: "100px",
      }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "200px",
        }}>
          <Typography sx={{
            display: "flex",
            alignItems: "center",
            color: "#E82552",
            fontSize: "40px",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
          }}
          >
            OcakeShop | Đơn mua
          </Typography>
        </Box>
      </Box>

      {/* Grey Box */}
      <Box sx={{
        background: "#E5E5E5",
        alignItems: "center",
        paddingLeft: "10%", paddingRight: "10%",
        paddingTop: "1%", paddingBottom: "5%"
      }}>
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
                >
                  <TableCell align="center"></TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Button sx={{
                      width: "150px",
                      background: "#FFDFE7",
                      color: "black",
                    }}
                      variant="contained" color="primary" onClick={handleConfirm}> Xác nhận </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout >
  );
};