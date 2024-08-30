"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Layout from "../layout";
import dayjs from 'dayjs';
// ----------- IMPORTANT
import { fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';

const addIngredient = () => {
  const [formData, setFormData] = useState(null); // Initial state as null
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const data = await fetchWithAuth(router, '/ingredient'); // Fetch ingredient with ID 1 (example)
        setFormData(data || {});
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchIngredient();
  }, []);

  const handleSave = async () => {
    try {
      const data = await fetchWithAuth(router, '/ingredient/add-ingredient', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data) {
        alert('Ingredient added successfully!');
        router.push('/inventory'); // Redirect to ingredient list page
      }
    } catch (err) {
      setError('Error adding ingredient: ' + err.message);
    }
  };

  const handleCancel = () => {
    console.log('Changes cancelled');
    router.push('/inventory'); // Redirect to ingredient list page
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
      expirationDate: dayjs(date).format('YYYY-MM-DD'), // Adjust to only keep the date
    }));
  };

  if (!formData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Layout>
      <Box sx={{
        background: "#fff",
        gap: "20px",
        marginTop: "100px",
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "200px",
        }}>
          <Typography sx={{
            display: "flex",
            alignItems: "center",
            color: "#E82552",
            fontSize: "40px",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
          }}>
            OcakeShop | Thêm nguyên liệu
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        background: "#E5E5E5",
        alignItems: "center",
        paddingLeft: "10%", paddingRight: "10%",
        paddingTop: "1%", paddingBottom: "5%"
      }}>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          alignContent: "space-between",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingRight: "230px",
          gap: "30px",
        }}>

          {/* Tên nguyên liệu */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Tên nguyên liệu
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="title"
                value={formData?.title || ''}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Số lượng */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Số lượng
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="quantity"
                value={formData?.quantity || ''}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                type="number"
              />
            </Box>
          </Box>

          {/* Đơn vị */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Đơn vị
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="unit"
                value={formData?.unit || ''}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Giá */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Giá
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="price"
                value={formData?.price || ''}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                type="number"
              />
            </Box>
          </Box>

          {/* Ngày hết hạn */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Ngày hết hạn
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData?.expirationDate ? dayjs(formData.expirationDate) : null} // Convert string to dayjs object
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  sx={{
                    width: "100%",
                    fontSize: "40px",
                    color: "#E5E5E5",
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* Mô tả */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
          }}>
            <Typography sx={{
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Mô tả
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="description"
                value={formData?.description || ''}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                multiline
                rows={4}
              />
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{
            display: 'flex', justifyContent: 'end', gap: "270px", paddingRight: "100px",
          }}>
            <Button sx={{
              width: "150px",
              background: "#FFDFE7",
              color: "black",
            }}
              variant="contained" color="primary" onClick={handleSave}> Lưu thay đổi </Button>

            <Button sx={{
              width: "150px",
              background: "#FFDFE7",
              color: "black",
            }}
              variant="contained" color="primary" onClick={handleCancel}> Hủy </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default addIngredient;
