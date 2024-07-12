import React from 'react';
import { Box, Typography, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../layout';

const CartPage = () => {
  const rows = [
    { name: 'Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate', price: 120000, quantity: 1 },
    { name: 'Nón sinh nhật', price: 30000, quantity: 2 },
    { name: 'Nến thơm', price: 120000, quantity: 1 },
  ];

  const calculateTotal = () => {
    return rows.reduce((acc, row) => acc + row.price * row.quantity, 0);
  };

  return (
    <Layout>
      <Box sx={{ background: 'linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)', minHeight: '100vh', padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>Ocake Shop | Giỏ hàng</Typography>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '900px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.price.toLocaleString()} VND</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Button variant="outlined">-</Button>
                      <Box component="span" sx={{ mx: 2 }}>{row.quantity}</Box>
                      <Button variant="outlined">+</Button>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{(row.price * row.quantity).toLocaleString()} VND</TableCell>
                  <TableCell align="center">
                    <Button color="error">Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: '20px', maxWidth: '900px', margin: '20px auto' }}>
          <Checkbox />
          <Typography variant="body1">Chọn tất cả</Typography>
          <Typography variant="h6">Tổng thanh toán: {calculateTotal().toLocaleString()} VND</Typography>
          <Button variant="contained" color="primary">Mua hàng</Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CartPage;
