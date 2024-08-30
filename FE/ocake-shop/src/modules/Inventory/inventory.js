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
  const [formData, setFormData] = useState(null); // Initial state as null
  const [error, setError] = useState('');
  // const [rows, setRows] = useState([]); // State to hold table data
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const router = useRouter();

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const data = await fetchWithAuth(router, '/ingredient');
        setFormData(data || {});
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchIngredient();
  }, []);

  const handleSave = async () => {
    try {
      const data = await fetchWithAuth(router, '/ingredient/update', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data) {
        alert('Ingredient updated successfully!');
        router.push('/ingredients'); // Redirect to ingredient list page
      }
    } catch (err) {
      setError('Error updating ingredient: ' + err.message);
    }
  };

  const handleCancel = () => {
    console.log('Changes cancelled');
    router.push('/ingredients'); // Redirect to ingredient list page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      expirationDate: dayjs(date).format('YYYY-MM-DD'),
    }));
  };

  const handleEditClick = (id) => {
    // Handle logic to edit row with specific id
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          <Link href="/addIngredient" passHref>
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
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="center">Đơn vị</TableCell>
                <TableCell align="center">Hạn sử dụng</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="center">{row.expirationDate}</TableCell>
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

export default Ingredient;
