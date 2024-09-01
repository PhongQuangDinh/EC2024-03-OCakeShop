"use client"; // Đảm bảo đây là một component phía client

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from "../layout";
import Link from "next/link";
import { fetchWithAuth } from '../../../WebConfig'; // Đảm bảo bạn đã import hàm fetchWithAuth
import { useRouter } from 'next/navigation';

// Hàm để định dạng thời gian
const formatDateTime = (dateTime) => {
  if (!dateTime) return 'Chưa có thông tin';
  const date = new Date(dateTime);
  return date.toLocaleString(); // Định dạng ngày giờ theo định dạng người dùng
};

const PurchaseOrderProcess = () => {
  const [valueCompleteDelivery, setValueCompleteDelivery] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIncompleteOrders = async () => {
      try {
        const response = await fetchWithAuth(router, '/ordercake/cus-not-received');
        if (!response) {
          setError('Error fetching data');
        } else {
          setValueCompleteDelivery(response);
        }
      } catch (error) {
        setError('Error fetching data');
        console.error("Not get handleDelivery", error);
      }
    };
    fetchIncompleteOrders();
  }, [router]);

  const handleConfirm = (orderID) => {
    // Handle save changes for a specific order
    console.log('Order confirmed:', orderID);
  };

  return (
    <Layout>
      <Box sx={{
        background: "#fff",
        gap: "20px",
        marginTop: "100px",
      }}>
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
          }}>
            OcakeShop | Đơn hàng chưa nhận
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        background: "#E5E5E5",
        paddingTop: "50px",
        fontFamily: "Monospace, sans-serif",
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
            <Link href="/purchaseorder-process" passHref>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#000",
                textDecoration: "none",
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
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Đơn hàng</TableCell>
                  <TableCell align="center">Tên khách hàng</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">Thời gian nhận hàng</TableCell>
                  <TableCell align="center">Xác nhận giao hàng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valueCompleteDelivery.length > 0 ? (
                  valueCompleteDelivery.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell> {/* Số thứ tự */}
                      <TableCell align="center">{item.orderCakeID}</TableCell>
                      <TableCell align="center">{item.customerName}</TableCell>
                      <TableCell align="center">{item.customerPhone}</TableCell>
                      <TableCell align="center">{formatDateTime(item.pickUpTime)}</TableCell>
                      <TableCell align="center">
                        <Button sx={{
                          width: "150px",
                          background: "#FFDFE7",
                          color: "black",
                        }}
                          variant="contained" color="primary" onClick={() => handleConfirm(item.orderCakeID)}> Xác nhận </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      {error ? error : "Không có dữ liệu"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default PurchaseOrderProcess;
