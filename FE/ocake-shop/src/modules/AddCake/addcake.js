"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import Layout from '../layout';

const AddCakePage = () => {
  const [cakeName, setCakeName] = useState('');
  const [size, setSize] = useState('');
  const [filling, setFilling] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  // State để lưu trữ danh sách kích thước và nhân bánh
  const [cakeSizes, setCakeSizes] = useState([]);
  const [cakeFillings, setCakeFillings] = useState([]);

  // Dữ liệu mặc định cho kích thước và nhân bánh
  const defaultSizes = [
    { cakeSizeID: 1, title: "16" },
    { cakeSizeID: 2, title: "18" },
    { cakeSizeID: 3, title: "20" },
    { cakeSizeID: 4, title: "22" },
    { cakeSizeID: 5, title: "24" },
  ];

  const defaultFillings = [
    { cakeFillingID: 1, title: "Cafe" },
    { cakeFillingID: 2, title: "Phô mai" },
    { cakeFillingID: 3, title: "Matcha" },
    { cakeFillingID: 4, title: "Vani" },
    { cakeFillingID: 5, title: "Dâu" },
    { cakeFillingID: 6, title: "Dứa" },
    { cakeFillingID: 7, title: "Chocolate" },
  ];

  // Fetch dữ liệu kích thước và nhân bánh từ server
  useEffect(() => {
    const fetchCakeSizes = async () => {
      try {
        const response = await fetch('/api/cakesizes'); // Đổi endpoint nếu cần
        const data = await response.json();
        setCakeSizes(data.length ? data : defaultSizes); // Sử dụng dữ liệu mặc định nếu không lấy được
      } catch (error) {
        console.error('Error fetching cake sizes:', error);
        setCakeSizes(defaultSizes); // Sử dụng dữ liệu mặc định khi có lỗi
      }
    };

    const fetchCakeFillings = async () => {
      try {
        const response = await fetch('/api/cakefillings'); // Đổi endpoint nếu cần
        const data = await response.json();
        setCakeFillings(data.length ? data : defaultFillings); // Sử dụng dữ liệu mặc định nếu không lấy được
      } catch (error) {
        console.error('Error fetching cake fillings:', error);
        setCakeFillings(defaultFillings); // Sử dụng dữ liệu mặc định khi có lỗi
      }
    };

    fetchCakeSizes();
    fetchCakeFillings();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to handle form submission goes here
  };

  return (
    <Layout>
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} /> {/* Viền màu vàng trên đầu */}
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '30px', marginLeft: '320px', color: '#E82552', fontWeight: 'bold' }}>
          Ocake Shop | Thêm bánh kem
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px',
            margin: 'auto',
            marginTop: '30px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <TextField
            label="Tên bánh kem"
            value={cakeName}
            onChange={(e) => setCakeName(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ 
              marginBottom: 2, 
              width: "100%",
              "& .MuiOutlinedInput-root": { 
                "& fieldset": {
                  borderColor: "#e82652", 
                },
                "&:hover fieldset": { 
                  borderColor: "#FFC0CB", 
                },
                "& input": { 
                  color: "#000000",
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho input
                },
                "&:hover input": { 
                  color: "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e82652",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                outline: "none",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
              },
            }}
          />

          {/* ComboBox cho kích thước bánh */}
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            displayEmpty
            fullWidth
            margin="normal"
            required
            sx={{ 
              marginBottom: 2, 
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { // Thay đổi đường viền bên ngoài
                borderColor: "#e82652", // Màu hồng
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB", // Màu hồng nhạt khi hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB", // Màu hồng khi focus
              },
              "& input": { 
                color: "#000000",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho input
              },
              "&:hover input": { 
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
              },
            }}
          >
            <MenuItem value="" disabled>
              Chọn kích thước
            </MenuItem>
            {cakeSizes.map((cakeSize) => (
              <MenuItem key={cakeSize.cakeSizeID} value={cakeSize.title}>
                {cakeSize.title}
              </MenuItem>
            ))}
          </Select>

          {/* ComboBox cho nhân bánh */}
          <Select
            value={filling}
            onChange={(e) => setFilling(e.target.value)}
            displayEmpty
            fullWidth
            margin="normal"
            required
            sx={{ 
              marginBottom: 2, 
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { // Thay đổi đường viền bên ngoài
                borderColor: "#e82652", // Màu hồng
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB", // Màu hồng nhạt khi hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB", // Màu hồng khi focus
              },
              "& input": { 
                color: "#000000",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho input
              },
              "&:hover input": { 
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
              },
            }}
          >
            <MenuItem value="" disabled>
              Chọn nhân bánh
            </MenuItem>
            {cakeFillings.map((cakeFilling) => (
              <MenuItem key={cakeFilling.cakeFillingID} value={cakeFilling.title}>
                {cakeFilling.title}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Giá bánh kem"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ 
              marginBottom: 2, 
              width: "100%",
              "& .MuiOutlinedInput-root": { 
                "& fieldset": {
                  borderColor: "#e82652", 
                },
                "&:hover fieldset": { 
                  borderColor: "#FFC0CB", 
                },
                "& input": { 
                  color: "#000000",
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho input
                },
                "&:hover input": { 
                  color: "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e82652",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                outline: "none",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
              },
            }}
          />
          <Box sx={{ width: '100%', margin: '20px 0' }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ width: '100%', padding: '20px', border: '2px dashed #E82552', color: '#E82552' }}
            >
              Thêm hình ảnh bánh kem
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {image && <Typography sx={{ marginTop: '10px' }}>{image.name}</Typography>}
          </Box>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#E82552', color: '#FFFFFF', "&:hover": { backgroundColor: '#D01442' } }}>
            Thêm
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddCakePage;
