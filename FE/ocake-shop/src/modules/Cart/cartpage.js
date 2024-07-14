import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Layout from '../layout';

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rows, setRows] = useState([
    { id: 1, name: 'Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate', price: 120000, quantity: 1, stockLimit: 10 },
    { id: 2, name: 'Nón sinh nhật', price: 30000, quantity: 2, stockLimit: 5 },
    { id: 3, name: 'Nến thơm', price: 120000, quantity: 1, stockLimit: 20 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const calculateTotal = () => {
    return rows.reduce((acc, row) => {
      if (selectedItems.includes(row.id)) {
        return acc + row.price * row.quantity;
      }
      return acc;
    }, 0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(rows.map(row => row.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const increaseQuantity = (id) => {
    setRows(rows.map(row => {
      if (row.id === id && row.quantity < row.stockLimit) {
        return { ...row, quantity: row.quantity + 1 };
      }
      return row;
    }));
  };

  const decreaseQuantity = (id) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        if (row.quantity === 1) {
          setItemToDelete(row.id);
          setOpenDialog(true);
        } else {
          return { ...row, quantity: row.quantity - 1 };
        }
      }
      return row;
    }));
  };

  const handleDeleteItem = () => {
    setRows(rows.filter(row => row.id !== itemToDelete));
    setSelectedItems(selectedItems.filter(id => id !== itemToDelete));
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setOpenDialog(true);
  };

  const isAllSelected = rows.length > 0 && selectedItems.length === rows.length;

  return (
    <Layout>
      <Box sx={{ background: 'linear-gradient(30deg, #E71F4D 0%, #f6e187 100%)', minHeight: '100vh', padding: '20px' }}>
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '70px', marginLeft: '300px' }}>Ocake Shop | Giỏ hàng</Typography>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '1200px', marginTop: '30px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sản phẩm</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(row.id)}
                      onChange={(event) => handleSelectItem(event, row.id)} 
                    />
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.price.toLocaleString()} VND
                    <Typography variant="body2" color="textSecondary">
                      Kho: {row.stockLimit}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px' }} 
                        onClick={() => decreaseQuantity(row.id)}
                      >
                        -
                      </Button>
                      <Box component="span" sx={{ mx: 2 }}>{row.quantity}</Box>
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px' }} 
                        onClick={() => increaseQuantity(row.id)}
                        disabled={row.quantity >= row.stockLimit}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{(row.price * row.quantity).toLocaleString()} VND</TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleDeleteClick(row.id)}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: '40px', maxWidth: '900px', margin: '40px auto' }}>
          <Box display="flex" alignItems="center">
            <Checkbox 
              indeterminate={selectedItems.length > 0 && selectedItems.length < rows.length}
              checked={isAllSelected}
              onChange={handleSelectAll} 
            />
            <Typography variant="body1">Chọn tất cả</Typography>
          </Box>
          <Typography variant="h6">Tổng thanh toán: {calculateTotal().toLocaleString()} VND</Typography>
          <Button variant="contained" 
                  sx={{ 
                        marginRight: '30px',
                        backgroundColor: "#FFDFE7", 
                        color: "#000000", 
                        border: "1px solid #e82652", 
                        "&:hover": { 
                          backgroundColor: "#FFC0CB", 
                          color: "#000000" 
                        },
                        fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho button
                        outline: "none",
                      }}
          >Mua hàng</Button>
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có muốn xóa món hàng này không?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
            <Button onClick={handleDeleteItem} color="primary">Xác nhận</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default CartPage;
