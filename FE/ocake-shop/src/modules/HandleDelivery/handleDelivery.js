"use client";
import { Box, Typography, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Layout from "../layout";
import React, { useState } from "react";

const Handling = () => {

  const [inforDelivery, setInforDelivery] = useState([
    {id: 1, idOrder: "001", name: "Đinh Quang Phong", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 2, idOrder: "002", name: "Trần Đỗ Anh Khoa", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 3, idOrder: "003", name: "Trần Trung Hiếu", phoneNumber: "0123231211", time: "12/6/2024"},
  ]);

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            background: "#fff",
            gap: "20px",
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "200px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#E82552",
                fontSize: "40px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              OcakeShop | Giao đơn hàng
            </Typography>
          </Box>
        </Box>
        <Box sx={{
           background: "#E5E5E5",
           fontFamily: "Monospace, sans-serif",
           paddingTop: "50px"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "underline",
                color: "#EA365F"
              }}>Đang xử lý</Typography>
            </Box>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
              }}>Đã hoàn thành</Typography>
            </Box>
          </Box>
          <Box sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}>
            <TableContainer component={Paper} sx={{ width: '91%', backgroundColor: "#fff" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Đơn hàng</TableCell>
                    <TableCell align="center">Tên khách hàng</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Thời gian nhận hàng</TableCell>
                    <TableCell align="center">Xác nhận giao hàng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inforDelivery.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.idOrder}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.time}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#FFDFE7",
                            color: "#000000",
                            border: "1px solid #e82652",
                            "&:hover": {
                              backgroundColor: "#FFC0CB",
                              color: "#000000",
                            },
                            fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho button
                            outline: "none",
                          }}
                        >
                          Xác nhận
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Handling;
