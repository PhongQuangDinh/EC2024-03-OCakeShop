"use client";
import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import Layout from '../layout';

const ConfirmationPage = () => {
  const order = {
    item: 'Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate',
    quantity: 1,
    price: 120000,
    deliveryDate: '22/06/2024'
  };

  return (
    <Layout>
        <Box sx={{ background: '#F9F4EF', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} /> {/* Viền màu vàng trên đầu */}
        <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: '30px', color: '#E82552', fontWeight: 'bold' }}>
            Ocake Shop | Xác nhận nhận hàng
        </Typography>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '800px', marginTop: '30px' }}>
            <Table>
            <TableBody>
                <TableRow>
                <TableCell align="left">
                    <Typography variant="h6">Thông tin đơn hàng</Typography>
                    <Typography>{order.item}</Typography>
                </TableCell>
                <TableCell align="center">{order.quantity}</TableCell>
                <TableCell align="right">{order.price.toLocaleString()} VND</TableCell>
                <TableCell align="right">{order.price.toLocaleString()} VND</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={4} align="left">
                    <Typography variant="body1">Thời gian giao hàng: {order.deliveryDate}</Typography>
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" sx={{ backgroundColor: '#E82552', color: '#FFFFFF', "&:hover": { backgroundColor: '#D01442' } }}>
            Nhận hàng thành công
            </Button>
        </Box>
        </Box>
    </Layout>
  );
};

export default ConfirmationPage;
