"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, MenuItem } from '@mui/material';
import Layout from "../layout";

const Profile = () => {
  // const [formData, setFormData] = useState({
  //   fullName: 'Phạm Uyên Nhi',
  //   phone: '0123123144',
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmPassword: '',
  //   address: 'Phường 5, quận 8, TP Hồ Chí Minh',
  //   paymentMethod: 'MB Bank',
  //   accountNumber: '*******789',
  // });
  const [formData, setFormData] = useState([]);

  useEffect(()=>{
    const getData = async() =>{
      const query = await fetch("http://localhost:8080/customer/myinfo/12");
      const response = await query.json();
      console.log("response from API ",response);
      setFormData(response);
    }
    getData();
  },[]);

  const handleSave = () => {
    // Handle save changes
    console.log('Changes saved:', formData);
  };

  const handleCancel = () => {
    // Handle cancel changes
    console.log('Changes cancelled');
  };

  return (
    <Layout>
      <Box sx={{
        background: "#fff",
        gap: "20px",
        marginTop: "100px",
      }}
      >
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
          }}
          >
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
          {/*Họ tên*/}
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
                defaultValue={formData.fullName}
              />
            </Box>
          </Box>

          {/*Số điện thoại*/}
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
                defaultValue={formData.phone}
              />
            </Box>
          </Box>

          {/* Reset Password */}
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

          {/* New password */}
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

          {/* New password Confirm */}
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

          {/* Address */}
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
                defaultValue={formData.address}
              />
            </Box>
          </Box>

          {/* Payment method */}
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
                defaultValue={formData.paymentMethod}
              />
            </Box>
          </Box>

          {/* Bank account */}
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
              defaultValue={formData.accountNumber}
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
    </Layout >
  );
};

export default Profile;