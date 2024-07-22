"use client";
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Layout from '../layout';

const AddCakePage = () => {
  const [cakeName, setCakeName] = useState('');
  const [size, setSize] = useState('');
  const [filling, setFilling] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

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
          />
          <TextField
            label="Kích thước"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nhân bánh"
            value={filling}
            onChange={(e) => setFilling(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Giá bánh kem"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            required
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
