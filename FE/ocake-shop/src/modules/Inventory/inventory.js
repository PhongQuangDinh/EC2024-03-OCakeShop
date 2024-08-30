"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Layout from "../layout";
import dayjs from 'dayjs';
import { fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Ingredient = () => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null); // State to track which row is being deleted
  const router = useRouter();

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const data = await fetchWithAuth(router, '/ingredient');
        setFormData(data || []);
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchIngredient();
  }, [router]);

  const handleSave = async (id) => {
    try {
      const data = await fetchWithAuth(router, `/ingredient/update-quantity/${id}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: formData.find(item => item.ingredientID === id).quantity }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (data) {
        alert('Cập nhật số lượng thành công!');
        setEditingRow(null); // Exit edit mode
      }
    } catch (err) {
      setError('Lỗi khi cập nhật số lượng: ' + err.message);
    }
  };
  
  const handleEditClick = (id) => {
    setEditingRow(id); // Enter edit mode for this row
  };

  const handleCancel = () => {
    setEditingRow(null); // Exit edit mode
  };

  const decreaseQuantity = (id) => {
    setFormData((prevState) => prevState.map(item =>
      item.ingredientID === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const increaseQuantity = (id) => {
    setFormData((prevState) => prevState.map(item =>
      item.ingredientID === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(router, `/ingredient/delete-ingredient/${id}`, {
        method: "DELETE",
      });
      
      // Remove the deleted item from the list
      setFormData((prevState) => prevState.filter(item => item.ingredientID !== id));
      alert('Nguyên liệu đã được xóa!');
    } catch (err) {
      setError('Lỗi khi xóa nguyên liệu: ' + err.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setDeletingRow(id); // Set the ingredient ID to be deleted
  };

  const handleCloseDeleteDialog = () => {
    setDeletingRow(null); // Close the dialog
  };

  const handleConfirmDelete = () => {
    if (deletingRow !== null) {
      handleDelete(deletingRow);
      handleCloseDeleteDialog();
    }
  };

  if (!formData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Layout>
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} />
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: '30px', marginLeft: '320px', marginRight: '430px' }}>
          <Typography variant="h4" align="left" gutterBottom sx={{ color: '#E82552', fontWeight: 'bold' }}>
            Ocake Shop | Nguyên liệu và trang thiết bị
          </Typography>
          <Link href="/add-ingredient" passHref>
            <Button
              variant="contained"
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
                <TableCell align="left">STT</TableCell>
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Đơn vị</TableCell>
                <TableCell align="center">Hạn sử dụng</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((row) => (
                <TableRow key={row.ingredientID}>
                  <TableCell>{row.ingredientID}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minWidth: '100px' }}>
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px', visibility: editingRow === row.ingredientID ? 'visible' : 'hidden' }}
                        onClick={() => decreaseQuantity(row.ingredientID)}
                      >
                        -
                      </Button>
                      <Box component="span" sx={{ mx: 2 }}>{row.quantity}</Box>
                      <Button 
                        variant="outlined" 
                        sx={{ minWidth: '30px', visibility: editingRow === row.ingredientID ? 'visible' : 'hidden' }}
                        onClick={() => increaseQuantity(row.ingredientID)}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="center">{row.expirationDate}</TableCell>
                  <TableCell align="center">
                    {editingRow === row.ingredientID ? (
                      <Button
                        sx={{ color: "#e82652" }}
                        onClick={() => handleSave(row.ingredientID)}
                      >
                        Lưu
                      </Button>
                    ) : (
                      <>
                        <Button
                          sx={{ color: "primary", mr: 1 }}
                          onClick={() => handleEditClick(row.ingredientID)}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          sx={{ color: "#e82652" }}
                          onClick={() => handleOpenDeleteDialog(row.ingredientID)}
                        >
                          Xóa
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Xác nhận xóa */}
        <Dialog
          open={deletingRow !== null}
          onClose={handleCloseDeleteDialog}
        >
          <DialogTitle>Xóa Nguyên Liệu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa nguyên liệu này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
            <Button onClick={handleConfirmDelete} color="error">Xóa</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Ingredient;
