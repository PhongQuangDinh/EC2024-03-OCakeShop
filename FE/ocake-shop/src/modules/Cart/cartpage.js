"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Layout from '../layout';
import { getApiUrl, fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const apiUrl = getApiUrl();
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetchWithAuth(router, '/cart/');
      // const data = await response.json();
      console.log(response);
      setRows(response);
    }
    catch(err){
      console.error(err);
      console.log(err);
      setError('Có lỗi khi lấy giỏ hàng');
    }
  }

  const calculateTotal = () => {
    return rows.reduce((acc, row) => {
      if (selectedItems.includes(row.cartID)) {
        return acc + (row.Cake.cakeSize.priceSize + row.Cake.cakeFilling.priceCakeFilling) * row.quantity;
      }
      return acc;
      }, 0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(rows.map(row => row.cartID));
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
      // if (row.cartID === id && row.quantity < row.stockLimit) {
      if (row.cartID === id) {
        return { ...row, quantity: row.quantity + 1 };
      }
      return row;
    }));
  };

  const decreaseQuantity = (id) => {
    setRows(rows.map(row => {
      if (row.cartID === id) {
        if (row.quantity === 1) {
          setItemToDelete(row.cartID);
          setOpenDialog(true);
        } else {
          return { ...row, quantity: row.quantity - 1 };
        }
      }
      return row;
    }));
  };

  const handleDeleteItem = async () => {
    try {
      await deleteCake(itemToDelete);  // This calls the API to delete the item from the backend database.
      setRows(rows.filter(row => row.cartID !== itemToDelete));  // Update the state to remove the deleted item.
      setSelectedItems(selectedItems.filter(id => id !== itemToDelete));
      setOpenDialog(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Failed to delete item:', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  const changeQuantityCake = async (row) => {
    try {
      
      const response = await fetchWithAuth(router, `/cart/update-cake`, {
        method: "POST",
        body: JSON.stringify(row),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Change Quantity Cake called with ' + row.quantity);
      if (response) {
        // alert('Cart updated successfully!');
        router.push('/cart');
      }
    }
    catch (error) {
      setError('Error updating cart: ' + error);
      console.log(error);
    }
  }

  const handleOrder = async () => {
    try {
      // console.log('handleOrder + SOSSSSSSSSSSSSS')
      if(rows.length <= 0) {
        router.push('/home');
      }
      if(selectedItems.length <= 0) {
        setError('Chọn bánh kem muốn mua');
      }
      
    }
    catch(err){
      console.log(err);
      setError('Error order: ' + err)
    }
  }
  
  const deleteCake = async (id) => {
    try {

      const data = await fetchWithAuth(router, `/cart/delete-cake/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });  
      console.log('Item deleted successfully');
    } catch (e) {
      console.error('Delete failed:', e);
      setError('Delete failed: ' + e);
    }
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
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} /> {/* Viền màu vàng trên đầu */}
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '30px', marginLeft: '320px', color: '#E82552', fontWeight: 'bold' }}>Ocake Shop | Giỏ hàng</Typography>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '1200px', marginTop: '30px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sản phẩm</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell align="center">Xóa</TableCell>
                <TableCell align="center">Thay đổi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.cartID}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(row.cartID)}
                      onChange={(event) => handleSelectItem(event, row.cartID)} 
                    />
                    {"Bánh kem nhân " + row.Cake.cakeFilling.title + " kích thước" + row.Cake.cakeSize.title}
                  </TableCell>
                  <TableCell align="right">
                    {/* {row.price.toLocaleString()} VND */}
                    {row.Cake.cakeSize.priceSize + row.Cake.cakeFilling.priceCakeFilling} VND
                    {/* <Typography variant="body2" color="textSecondary">
                      Kho: {row.stockLimit}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px' }} 
                        onClick={() => decreaseQuantity(row.cartID) & setValue(row)}
                      >
                        -
                      </Button>
                      <Box component="span" sx={{ mx: 2 }}>{row.quantity}</Box>
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px' }} 
                        onClick={() => increaseQuantity(row.cartID) & setValue(row)}
                        // disabled={row.quantity >= row.stockLimit}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{((row.Cake.cakeSize.priceSize + row.Cake.cakeFilling.priceCakeFilling) * row.quantity).toLocaleString()} VND</TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleDeleteClick(row.cartID)}>Xóa</Button>
                  
                  </TableCell>
                  <TableCell align="center">
                    <Button color="primary" onClick={() => changeQuantityCake(row)}>Lưu</Button>
                  
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: '40px', maxWidth: '1170px', margin: '40px auto' }}>
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
                        marginRight: '100px',
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
                    onClick={handleOrder}
          >Mua hàng</Button>
        </Box>
        <Box sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
          {error && selectedItems.length <=0  && <Typography color="error">{error}</Typography>}
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
