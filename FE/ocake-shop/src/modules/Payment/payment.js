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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Layout from "../layout";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth, getApiUrl } from '../../../WebConfig';

const Payment = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();
  const minDate = today.add(2, 'day');
  const [infoCustomer, setInfoCustomer] = useState('');
  const [error, setError] = useState('');
  const [infoCake, setInfoCake] = useState([]);
  const [orderCake, setOrderCake] = useState('');
  const costDelivery = 35000;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchWithAuth(router, '/customer/myinfo');  // if method not defined it would be GET by default
        console.log(data);
        setInfoCustomer(data?.Customer || '');
      } catch (err) {
        setError('SOS ' + err.message);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchCake = async () => {
      const token = localStorage.getItem('token');
      const apiUrl = getApiUrl();
     
      if (!token) {
          console.log('No token found');
          router.push('/signin');
          return;
      }
  
      try {
          const response = await fetch(`${apiUrl}/cart/buying`, {
            method: "GET",  
            headers: {
              "authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log(`${apiUrl}/cart/buying`);
  
          if (!response.ok) {
              if (response.status === 403) {
                  console.log('Session expired. Redirecting to signin.');
                  localStorage.removeItem('token');
                  router.push(`/signin?message=${encodeURIComponent('Your session has expired')}`);
                  return;
              } else {
                  // router.push('/cart');
                  // alert("???????????")
                  window.location.href = '/cart';
                  return;
              }
          }
  
          const data = await response.json();
          if(data){
            console.log(data.cart);
            setInfoCake(data);
            
            return;
          }
          window.location.href = '/cart';
        } catch (err) {
          setError('SOS ' + err.message);
        }
    };
    fetchCake();
  }, []); // Add dependencies if required
  

  // useEffect(() => {
  //   const fetchCake = async () => {
  //     const token = localStorage.getItem('token');
  //     const apiUrl = getApiUrl();

  //   if (!token) {
  //       console.log('No token found');
  //       router.push('/signin');
  //       return;
  //   }

  //   try {
  //       const response = await fetch(`${apiUrl}/cart/buying`, {
  //         method: "GET",  
  //         headers: {
  //           "authorization": `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           },
  //       });

  //       if (!response.ok) {
  //           if (response.status === 403) {
  //               console.log('Session expired. Redirecting to signin.');
  //               localStorage.removeItem('token');
  //               router.push(`/signin?message=${encodeURIComponent('Your session has expired')}`);
  //               return null;
  //           } else {
  //             router.push('/cart');
  //             return;
  //               // const contentType = response.headers.get("content-type");
  //               // if (contentType && contentType.includes("application/json")) {
  //               //     const errorData = await response.json();
  //               //     throw new Error(errorData.message || 'Request failed');
  //               // } else {
  //               //     const errorText = await response.text();
  //               //     throw new Error(errorText || 'An error occurred');
  //               // }
  //           }
  //       }

  //       const data = await response.json();


  //     // try {
  //     //   const data = await fetchWithAuth(router, '/cart/buying');  // if method not defined it would be GET by default
  //     //   if (!data) {
  //     //     router.push('/cart');
  //     //   }
  //       setInfoCake(data);
  //     } catch (err) {
  //       setError('SOS ' + err.message);
  //     }
  //   };
  //   fetchCake();
  // }, []);

  const calculateTotal = () => {
    return infoCake.reduce((acc, row) => {
      return acc + ((row.priceCake) * row.quantity) + costDelivery;
    }, 0);
  };

  const handleChange = () => {
    router.push('/profile')
  };

  const handleComeBack = async () => {
    try {
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
    catch (err) {
      console.log(err);
      setError('Error order: ' + err)
    }
  }

  const handleSetOrder = async () => {
    if (!selectedDate) {
      setError('Chọn ngày nhận hàng');
      return;
    }
  
    const conversionRate = 25000;
  
    const items = infoCake.map(cake => ({
      name: `Bánh kem nhân ${cake.cakeFilling.title} kích thước ${cake.cakeSize.title}`,
      description: `Bánh kem nhân ${cake.cakeFilling.title} kích thước ${cake.cakeSize.title}`,
      quantity: cake.quantity,
      unit_amount: {
        currency_code: 'USD',
        value: (cake.priceCake / conversionRate).toFixed(2).toString()  // Convert VND to USD
      }
    }));
  
    const itemTotalValue = infoCake.reduce((acc, row) => acc + (row.priceCake * row.quantity) / conversionRate, 0).toFixed(2);
    const shippingValue = (costDelivery / conversionRate).toFixed(2);
    const totalValue = (parseFloat(itemTotalValue) + parseFloat(shippingValue)).toFixed(2);
  
    const amount = {
      currency_code: 'USD',
      value: totalValue,
      breakdown: {
        item_total: {
          currency_code: 'USD',
          value: itemTotalValue
        },
        shipping: {
          currency_code: 'USD',
          value: shippingValue
        }
      }
    };
  
    const orderData = {
      items,
      amount,
      customer: {
        name: infoCustomer?.name,
        phoneNumber: infoCustomer?.phoneNumber,
        address: infoCustomer?.address
      },
      delivery_date: selectedDate.format('YYYY-MM-DD'),
      shipping_preference: 'NO_SHIPPING'
    };
  
    console.log('Order Data:', JSON.stringify(orderData, null, 2)); // Add this to debug the full orderData structure
  
    try {
      console.log("click me please");
      const data = await fetchWithAuth(router, '/payment/pay', {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (data) {
        console.log("Hello");
        await handleAddOrderCake();
        window.location.href = data.paypal_link;
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };
  

  const handleAddOrderCake = async() => {
    try {
      const pickUpTime = selectedDate;
      const orderCake = {pickUpTime};
      const data = await fetchWithAuth(router, '/ordercake/add-order', {
        method: "POST",
        body: JSON.stringify(orderCake),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data) {
        console.log("add order cake failed");
        return;
      }
      setOrderCake(data);
      await handleAddOrderCakeDetail(data);
    } catch (err) {
      setError('Error: ' + err.message);
      console.log(error+ "Add order cake");
    }
  };

  const handleAddOrderCakeDetail = async(orderCake) => {
    try{
      const cart = infoCake;
      const orderCakeID = orderCake.orderCakeID;  
      const formData = cart.map(cartItem => ({
        cartItem,
        orderCakeID
      }));
      const data = await fetchWithAuth(router, '/ordercake/add-order-detail', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!data) {
        console.log("add order cake detail failed");
        return;
      }
    }
    catch(error){
      setError('Error: ' + err.message);
      console.log(error + "Add order cake detail");
    }
  }


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
                    {infoCustomer?.name}
                  </Typography>
                  <Typography
                    sx={{
                      alignContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {infoCustomer?.phoneNumber}
                  </Typography>
                  <Typography
                    sx={{
                      alignContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {infoCustomer?.address}
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
                  {infoCake?.map((cake) => (
                    <TableRow key={cake.id}>
                      <TableCell
                        sx={{ paddingLeft: "3%" }}
                        align="left"
                      >
                        {"Bánh kem nhân " + cake.cakeFilling.title + " kích thước " + cake.cakeSize.title}
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
                marginRight: "6.5%",
               }}>
                <Typography align="right" sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}>
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
                    <DateTimePicker
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      minDateTime={minDate} // Đặt ngày giờ tối thiểu
                      renderInput={(params) => <TextField {...params} />}
                      disablePast // Vô hiệu hóa các ngày trong quá khứ
                      format="DD/MM/YYYY HH:mm" // Định dạng ngày giờ
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