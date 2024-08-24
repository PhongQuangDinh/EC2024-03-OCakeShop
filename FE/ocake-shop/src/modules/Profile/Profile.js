"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Layout from "../layout";

const Profile = () => {
  const [formData, setFormData] = useState(null);  // Initialize as null
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/customer/myinfo", {
          method: "GET",
          headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Get profile failed');
          return;
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError('SOS ' + err.message);
        console.log('SOS ' + err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = () => {
    // Handle save changes
    console.log('Changes saved:', formData);
  };

  const handleCancel = () => {
    // Handle cancel changes
    console.log('Changes cancelled');
  };

  if (!formData) {
    return <Typography>Loading...</Typography>; // Show a loading indicator or message
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

      {/* Grey Box */}
      <Box sx={{
        background: "#E5E5E5",
        alignItems: "center",
        paddingLeft: "10%", paddingRight: "10%",
        paddingTop: "1%", paddingBottom: "5%"
      }}>

        {/* White Content One */}
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
                sx={{
                  width: "100%",
                  fontSize: "100px",
                  color: "#E5E5E5",
                }}
                defaultValue={formData.Customer?.name || ''}
              />
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
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                defaultValue={formData.Customer?.phoneNumber || ''}
              />
            </Box>
          </Box>

          {/* Đổi mật khẩu */}
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
              Đổi mật khẩu
            </Typography>
            <Box sx={{
              display: "flex",
              width: "600px",
            }}>
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                label="Mật khẩu cũ" variant="outlined"
              />
            </Box>
          </Box>

          {/* Mật khẩu mới */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}>
            <TextField
              sx={{
                width: "600px",
                fontSize: "40px",
                color: "#E5E5E5",
              }}
              label="Mật khẩu mới" variant="outlined"
            />
          </Box>

          {/* Xác nhận mật khẩu mới */}
          <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}>
            <TextField
              sx={{
                width: "600px",
                fontSize: "40px",
                color: "#E5E5E5",
              }}
              label="Xác nhận Mật khẩu mới" variant="outlined"
            />
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
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                defaultValue={formData.Customer?.address || ''}
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
                sx={{
                  width: "100%",
                  fontSize: "40px",
                  color: "#E5E5E5",
                }}
                defaultValue={formData.Customer?.paymentMethod || ''}
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
              sx={{
                width: "600px",
                fontSize: "40px",
                color: "#E5E5E5",
              }}
              defaultValue={formData.Customer?.accountNumber || ''}
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
