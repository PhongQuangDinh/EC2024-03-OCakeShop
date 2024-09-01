"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import Layout from '../layout';
import { fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';

const AddCakePage = () => {
  const router = useRouter();
  const [cakeName, setCakeName] = useState('');
  const [size, setSize] = useState('');
  const [filling, setFilling] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const [cakeSizes, setCakeSizes] = useState([]);
  const [cakeFillings, setCakeFillings] = useState([]);

  useEffect(() => {
    const fetchCakeSizes = async () => {
      try {
        const data = await fetchWithAuth(router, '/cake/size');
        setCakeSizes(data || []);
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    const fetchCakeFillings = async () => {
      try {
        const data = await fetchWithAuth(router, '/cake/filling');
        setCakeFillings(data || []);
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchCakeSizes();
    fetchCakeFillings();
  }, [router]);

  useEffect(() => {
    // Calculate the total price when size or filling changes
    const selectedSize = cakeSizes.find(s => s.title === size);
    const selectedFilling = cakeFillings.find(f => f.title === filling);

    const calculatedPrice =
      (selectedSize ? selectedSize.priceSize : 0) +
      (selectedFilling ? selectedFilling.priceCakeFilling : 0);

    setPrice(calculatedPrice);
  }, [size, filling, cakeSizes, cakeFillings]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Đã thêm bánh thành công");
  };

  return (
    <Layout>
      <Box sx={{ background: '#E5E5E5', minHeight: '100vh', padding: '0px' }}>
        <Box sx={{ height: '90px', backgroundColor: '#FBF0D4' }} />
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
                  fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
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
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e82652",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB",
              },
              "& input": {
                color: "#000000",
                fontFamily: "Montserrat, sans-serif",
              },
              "&:hover input": {
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif",
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
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e82652",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFC0CB",
              },
              "& input": {
                color: "#000000",
                fontFamily: "Montserrat, sans-serif",
              },
              "&:hover input": {
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#e82652",
                fontFamily: "Montserrat, sans-serif",
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
                  fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
              },
            }}
            disabled
          />
          <Box sx={{ width: '100%', margin: '20px 0' }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ width: '100%', padding: '20px', border: '2px dashed #E82552', color: '#E82552' }}
            >
              Thêm hình ảnh bánh kem
              <input type="file" hidden onChange={handleImageUpload} required/>
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
