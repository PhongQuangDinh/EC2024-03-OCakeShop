"use client"; // Đảm bảo đây là một component phía client

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from "../layout";
import Link from "next/link";
import { fetchWithAuth } from '../../../WebConfig'; // Đảm bảo bạn đã import hàm fetchWithAuth
import { useRouter } from 'next/navigation';
import { format, isValid } from 'date-fns'; // Import thêm hàm isValid

// Hàm để định dạng thời gian
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  if (isValid(date)) {
    return format(date, "dd/MM/yyyy - HH:mm");
  } else {
    return "Ngày giờ không hợp lệ";
  }
};

const PurchaseOrderComplete = () => {
  const [valueCompleteDelivery, setValueCompleteDelivery] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCompleteOrders = async () => {
      try {
        const data = await fetchWithAuth(router, '/ordercake/cus-received');
        setValueCompleteDelivery(data || []);
      } catch (err) {
        setError('Lỗi khi tải dữ liệu: ' + err.message);
      }
    };
  
    fetchCompleteOrders();
  }, [router]);

  const handleConfirm = async (orderID) => {
    try {
      // Handle save changes for a specific order
      console.log('Order confirmed:', orderID);
      // Example of a confirmation request
      await fetchWithAuth(router, `/ordercake/confirm/${orderID}`, {
        method: 'POST',
      });
      // Refresh data after confirmation
      const data = await fetchWithAuth(router, '/ordercake/cus-received');
      setValueCompleteDelivery(data || []);
    } catch (err) {
      setError('Lỗi khi xác nhận đơn hàng: ' + err.message);
    }
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
            OcakeShop | Đơn hàng đã nhận
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
                  <TableCell align="center">Tên bánh</TableCell>
                  <TableCell align="center">Kích thước bánh</TableCell>
                  <TableCell align="center">Nhân bánh</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Ngày giao</TableCell>
                  <TableCell align="center">Trạng thái nhận hàng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valueCompleteDelivery.length > 0 ? (
                  valueCompleteDelivery.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell> {/* Số thứ tự */}
                      <TableCell align="center">{item.orderCakeID}</TableCell>
                      <TableCell align="center">{item.cakeName}</TableCell>
                      <TableCell align="center">{item.cakeSize}</TableCell>
                      <TableCell align="center">{item.cakeFilling}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{formatDateTime(item.pickUpTime)}</TableCell>
                      <TableCell align="center">
                          <Typography
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#EA365F",
                              fontWeight: "bold",
                            }}
                          >
                            {item.receiveStatus}
                          </Typography>
                        </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={9}>
                      {error ? error : "Không có dữ liệu"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ paddingTop: "20px", background: "#E5E5E5" }}></Box>
    </Layout>
  );
};

export default PurchaseOrderComplete;
