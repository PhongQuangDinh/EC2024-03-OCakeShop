"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Layout from '../layout';

const InventoryPage = () => {
  // const [rows, setRows] = useState([
  //   { id: 1, name: 'Bột mì', quantity: 50, unit: 'Kg', expiryDate: '12/12/2024' },
  //   { id: 2, name: 'Trứng', quantity: 200, unit: 'Quả', expiryDate: '12/12/2024' },
  //   { id: 3, name: 'Máy nướng', quantity: 2, unit: 'Cái', expiryDate: '' },
  //   { id: 4, name: 'Máy đánh trứng', quantity: 2, unit: 'Cái', expiryDate: '' },
  // ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchInv = async () => {
      
      try {
        const data = await fetchWithAuth(router, '/ingredient');  // if method not defined it would be GET by default
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchInv();
  }, []);

  const handleEditClick = (id) => {
    setItemToEdit(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToEdit(null);
  };

  return (
    <Layout>
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} />
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: '30px', marginLeft: '320px', marginRight: '430px' }}>
          <Typography variant="h4" align="left" gutterBottom sx={{ color: '#E82552', fontWeight: 'bold' }}>
            Ocake Shop | Nguyên liệu và trang thiết bị
          </Typography>
          <Link href="/addIngredient" passHref>
            <Button variant="contained" 
                      sx={{ 
                        backgroundColor: "#FFDFE7", 
                        color: "#000000", 
                        border: "1px solid #e82652", 
                        "&:hover": { 
                          backgroundColor: "#FFC0CB", 
                          color: "#000000" 
                        },
                        outline: "none",
                      }}
            >
              Thêm
            </Button>
          </Link>
        </Box>
        <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '1200px', marginTop: '30px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="center">Đơn vị</TableCell>
                <TableCell align="center">Hạn sử dụng</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="center">{row.expiryDate}</TableCell>
                  <TableCell align="center">
                    <Button 
                      sx={{ 
                        color: "#e82652",
                      }} 
                      onClick={() => handleEditClick(row.id)}
                    >
                      Chỉnh sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText>Chỉnh sửa thông tin sản phẩm tại đây.</DialogContentText>
            {/* Form chỉnh sửa sản phẩm */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
            <Button color="primary">Xác nhận</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default InventoryPage;
