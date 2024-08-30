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

const Profile = () => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // NO MISS

  useEffect(() => {
    const fetchProfile = async () => {
      
      try {
        const data = await fetchWithAuth(router, '/customer/myinfo');  // if method not defined it would be GET by default
        setFormData(data?.Customer || '');
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchProfile();
  }, []);

  // const handleSave = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       setError('No token found, please log in again.');
  //       router.push(`/signin?message=${encodeURIComponent('Your session has expired')}`);
  //       return;
  //     }

  //     const response = await fetch(`${apiUrl}/customer/update`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       body: JSON.stringify(formData), // Send the updated formData
  //     });

  //     if (!response.ok) {
  //       const contentType = response.headers.get("content-type");
  //       if (contentType && contentType.includes("application/json")) {
  //         const errorData = await response.json();
  //         setError(errorData.message || 'Failed to update profile.');
  //       } else {
  //         const errorText = await response.text();
  //         setError(errorText || 'An error occurred.');
  //       }
  //       return;
  //     }

  //     const data = await response.json();
  //     alert('Cập nhật thành công!');
  //     router.push('/profile');
  //   } catch (error) {
  //     setError("Cập nhật thất bại: " + error.message);
  //   }
  // };

  const handleSave = async () => {
    try {
      const data = await fetchWithAuth(router, '/customer/update', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });  // Save the updated profile using POST

      if (data) {
        alert('Profile updated successfully!');
        router.push('/profile');
      }
    } catch (err) {
      setError('Error updating profile: ' + err.message);
    }
  };

  const handleCancel = () => {
    console.log('Changes cancelled');
    router.push('/home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const updatedFormData = { ...prevState };

      // Check if the field belongs to the CreditCard object
      if (updatedFormData.CreditCard && name in updatedFormData.CreditCard) {
        updatedFormData.CreditCard[name] = value;
      } else {
        // Update top-level Customer fields
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: dayjs(date).format('YYYY-MM-DD'), // Adjust to only keep the date
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
            OcakeShop | Hồ sơ khách hàng
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

          {/* Họ tên */}
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
              Họ tên
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="name"
                value={formData?.name}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "100px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Sinh nhật */}
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
              Ngày sinh
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData?.dateOfBirth ? dayjs(formData.dateOfBirth) : null} // Convert string to dayjs object
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  sx={{
                    width: "100%",
                    fontSize: "100px",
                    color: "#E5E5E5",
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* Số điện thoại */}
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
              Số điện thoại
            </Typography>
            <Box sx={{
              width: "600px",
            }}>
              <TextField
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Địa chỉ mặc định */}
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
              Địa chỉ mặc định
            </Typography>
            <Box sx={{
              display: "flex",
              width: "600px",
            }}>
              <TextField
                name="address"
                value={formData?.address}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Phương thức thanh toán */}
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
              Phương thức thanh toán
            </Typography>
            <Box sx={{
              display: "flex",
              width: "600px",
            }}>
              <TextField
                name="paymentMethod"
                value={formData.CreditCard?.paymentMethod}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
              />
            </Box>
          </Box>

          {/* Tài khoản ngân hàng */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}>
            <TextField
              name="accountNumber"
              value={formData.CreditCard?.accountNumber}
              onChange={handleChange}
              sx={{
                width: "600px",
                fontSize: "40px",
                color: "#E5E5E5",
              }}
            />
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

export default Profile;
