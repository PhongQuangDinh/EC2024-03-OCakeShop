"use client"
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Layout from "../layout";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from '../../../WebConfig';

const Payment = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();
  const minDate = today.add(2, 'day');
  const [inforCustomer, setInforCustomer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      
      try {
        const data = await fetchWithAuth(router, '/customer/myinfo');  // if method not defined it would be GET by default
        setInforCustomer(data?.Customer || '');
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchCake = async () => {
      
      try {
        const data = await fetchWithAuth(router, '/cart/buying');  // if method not defined it would be GET by default
        if(!data){
          router.push('/cart');
        }
        setInfoCake(data);
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchCake();
  }, []);

  const [infoCake, setInfoCake] = useState([]);

  const costDelivery = 35000;

  const calculateTotal = () => {
    return infoCake.reduce((acc, row) => {
      return acc + ((row.priceCake) * row.quantity) + costDelivery;
    }, 0);
  };

  const handleChange = () => {
    alert("Hello");
    // router.push('/home');
  };

  const handleComeBack = async () => {
    try{
      const data = await fetchWithAuth(router, '/cart/return-cart', {
        method: "POST",
        body: JSON.stringify(infoCake),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data) {
        router.push('/cart');
      }
    }
    catch(err){
      console.log(err);
      setError('Error order: ' + err)
    }
  }

  const handleSetOrder = async() => {
    if(!selectedDate){
      setError('Chọn ngày nhận hàng');
      return;
    }
    try {
      const data = await fetchWithAuth(router, '/payment/pay', {
        method: "POST",
        body: JSON.stringify(inforCustomer),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data) {
        // alert('Order is set successfully!');
        window.location.href = data.paypal_link; // redirect to Paypal page
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            background: "#fff",
            gap: "20px",
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "200px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#E82552",
                fontSize: "40px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              OcakeShop | Thanh toán
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E5E5E5",
            alignItems: "center",
            flexDirection: "column",
            fontFamily: "Monospace, sans-serif",
            display: "flex",
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
              background: "#fff",
              width: "90%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                paddingLeft: "3%",
                paddingTop: "10px",
              }}
            >
              <FmdGoodIcon sx={{ fontSize: 30 }} />
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Thông tin nhận hàng
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Box sx={{
                justifyContent: "space-between", 
                gap: "100px",
                display: "flex",
                alignContent: "center",  
                marginLeft: "3%"
              }}>
                  <Typography
                    sx={{
                      alignContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {inforCustomer?.name}
                  </Typography>
                  <Typography
                    sx={{
                      alignContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {inforCustomer?.phoneNumber}
                  </Typography>
                  <Typography
                    sx={{
                      alignContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {inforCustomer?.address}
                  </Typography>
              </Box>
              <Box sx={{ marginRight: "4%" }}>
                <Button onClick={handleChange} sx={{}}>
                  Thay đổi
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              background: "#fff",
              width: "90%",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                borderBottom: "none",
                boxShadow: "none",
                "& .MuiTable-root": {
                  borderBottom: "none",
                },
              }}
            >
              <Table
                sx={{
                  marginTop: "20px",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "30px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "bold",
                        paddingLeft: "3%",
                      }}
                      align="left"
                    >
                      Sản phẩm
                    </TableCell>
                    <TableCell align="center">
                      Số lượng
                    </TableCell>
                    <TableCell align="center">
                      Đơn giá
                    </TableCell>
                    <TableCell align="center">
                      Thành tiền
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {infoCake.map((cake) => (
                    <TableRow key={cake.id}>
                      <TableCell
                        sx={{ paddingLeft: "3%" }}
                        align="left"
                      >
                        {"Bánh kem nhân " + cake.cakeFilling.title + " kích thước" + cake.cakeSize.title}
                      </TableCell>
                      <TableCell align="center">
                        {cake.quantity}
                      </TableCell>
                      <TableCell align="center">
                        {cake.priceCake}
                      </TableCell>
                      <TableCell align="center">
                        {((cake.priceCake) * cake.quantity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                marginLeft: "3%",
                marginTop: "1%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Phí vận chuyển
                </Typography>
              </Box>
              <Box sx={{ 
                marginRight: "5%",
                fontSize: "30px",
                fontWeight: "bold",
               }}>
                <Typography align="right">
                  {costDelivery.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                background: "#fff",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  height: "0.5px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                  margin: "20px 0",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                marginLeft: "3%",
                justifyContent: "space-between", 
                marginBottom: "20px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      flex: 1,
                      textAlign: "left"
                    }}
                  >
                    Thời gian nhận hàng
                  </Typography>
                  <Box sx={{ marginRight: "50px" }}>
                    <DatePicker
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      minDate={minDate} // Đặt ngày tối thiểu
                      renderInput={(params) => <TextField {...params} />}
                      disablePast // Vô hiệu hóa các ngày trong quá khứ
                      format="DD/MM/YYYY"
                    />
                  </Box>
                </Box>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              background: "#fff",
              width: "90%",
              marginBottom: "30px"
            }}
          >
            <Box
              sx={{
                marginTop: "1.5%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Box sx={{
                marginLeft: "3%"
              }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Phương thức thanh toán
                </Typography>
              </Box>
              <Box sx={{
                display: "flex",
                alignContent: "center",
                gap: "30px",
                marginRight: "4%"

              }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  VNPAY
                </Typography>
                <Button>Thay đổi</Button>
              </Box>
              
            </Box>

            <Box
              sx={{
                background: "#fff",
                // padding: "20px",
                width: "90%",
                // margin: "0 auto",
              }}
            >
              <div
                style={{
                  height: "1px",
                  borderBottom: "2px dashed rgba(0, 0, 0, 0.3)",
                  margin: "10px 0",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                gap: "5%",
                paddingRight: "5%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Tổng thanh toán
              </Typography>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#FF0000",
                }}
              >
                {calculateTotal().toLocaleString()} VND
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
                gap: "60%",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFDFE7",
                  color: "#000000",
                  border: "1px solid #e82652",
                  "&:hover": {
                    backgroundColor: "#FFC0CB",
                    color: "#000000",
                  },
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho button
                  outline: "none",
                }}
                onClick={handleComeBack}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#FFDFE7",
                  color: "#000000",
                  border: "1px solid #e82652",
                  "&:hover": {
                    backgroundColor: "#FFC0CB",
                    color: "#000000",
                  },
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho butn
                  outline: "none",
                }} onClick={handleSetOrder}
              >
                Đặt hàng
              </Button>
            </Box>
          </Box>
          <Box>
          {error && !selectedDate && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Payment;