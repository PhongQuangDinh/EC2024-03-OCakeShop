"use client"; // Đảm bảo đây là một component phía client

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Layout from "../layout";
import Link from "next/link";
import { fetchWithAuth } from '../../../WebConfig'; // Đảm bảo bạn đã import hàm fetchWithAuth
import { useRouter } from 'next/navigation';

const CompleteDelivery = () => {
  const [inforDelivery, setInforDelivery] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const data = await fetchWithAuth(router, '/ordercake/admin-delivered');
        setInforDelivery(data || []);
      } catch (err) {
        setError('Lỗi khi tải dữ liệu: ' + err.message);
      }
    };

    fetchDeliveryData();
  }, [router]);

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
              OcakeShop | Đơn mua
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
              <Link href="/handle-delivery" passHref>
                <Typography sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                }}>Đang xử lý</Typography>
              </Link>
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
                textDecoration: "underline",
                color: "#EA365F"
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
                  {inforDelivery.length > 0 ? (
                    inforDelivery.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.orderCakeID}</TableCell>
                        <TableCell align="center">{item.customerName}</TableCell>
                        <TableCell align="center">{item.customerPhone}</TableCell>
                        <TableCell align="center">{item.pickUpTime}</TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#EA365F",
                              fontWeight: "bold",
                            }}
                          >
                            Đã xác nhận
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        {error ? error : "Không có dữ liệu"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingTop: "20px", background: "#E5E5E5" }}></Box>
    </Layout>
  );
};

export default CompleteDelivery;
