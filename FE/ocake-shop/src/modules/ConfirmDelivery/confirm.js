"use client";
import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../layout';

const ConfirmationPage = () => {
  const order = {
    items: [
      {
        id: 1,
        name: 'Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate',
        quantity: 1,
        unitPrice: 120000,
      }
    ],
    deliveryDate: '22/06/2024'
  };

  const calculateTotal = () => {
    return order.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  return (
    <Layout>
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} /> {/* Viền màu vàng trên đầu */}
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '30px', marginLeft: '320px', color: '#E82552', fontWeight: 'bold' }}>
          Ocake Shop | Xác nhận nhận hàng
        </Typography>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '1200px', marginTop: '30px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Thông tin đơn hàng</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{item.unitPrice.toLocaleString()} VND</TableCell>
                  <TableCell align="right">{(item.unitPrice * item.quantity).toLocaleString()} VND</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="left">
                  <Typography variant="h6">Thời gian giao hàng:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{order.deliveryDate}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="left">
                  <Typography variant="h6">Tổng thanh toán:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{calculateTotal().toLocaleString()} VND</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Button variant="contained" sx={{ backgroundColor: '#E82552', color: '#FFFFFF', "&:hover": { backgroundColor: '#D01442' } }}>
                    Nhận hàng thành công
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default ConfirmationPage;
