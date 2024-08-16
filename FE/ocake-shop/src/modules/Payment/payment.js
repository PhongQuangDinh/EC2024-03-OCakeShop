"use client";
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
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Layout from "../layout";
import Image from "next/image";
import logo from "./../../app/image/logo.png";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Payment = () => {
  // const router = useRouter();
  // const inforCustomer = ["Phạm Uyển Nhi", "0123456789", "191 Nguyễn Trãi phường 1 quận 5 TP.HCM"];

  const [inforCustomer, setInforCustomer] = useState([
    "Phạm Uyễn Nhi",
    "0123456789",
    "191 Nguyễn Trãi phường 1 quận 5 TP.HCM",
  ]);

  const [inforCake, setInforCake] = useState([
    {
      id: 1,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "2 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 2,
      price: 120000,
    },
    {
      id: 2,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
    {
      id: 3,
      name: "Bánh kem sinh nhật hồng cho bé gái",
      floor: "1 tầng",
      size: "24cm, 20cm",
      filling: "Chocolate",
      quantity: 1,
      price: 100000,
    },
  ]);


  const costDelivery = 35000;

  const time = "22/12/2024";

  const calculateTotal = () => {
    return inforCake.reduce((acc, row) => {
      return acc + row.price * row.quantity + costDelivery;
    }, 0);
  };

  const handleChange = () => {
    alert("Hello");
    // router.push('/home');
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            background: "#fff",
            gap: "20px",
            // fontSize: "20px",
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // padding: "90px",
              marginLeft: "200px",
            }}
          >
            {/* <Image priority src={logo} alt="logo" width={100} /> */}
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
                // padding: "20px",
                // marginLeft: "90px",
                // marginRight: "90px",
                justifyContent: "space-between",
                display: "flex",
                // gap: "362px",
              }}
            >
              <Box sx={{
                justifyContent: "space-between", 
                gap: "100px",
                display: "flex",
                alignContent: "center",  
                marginLeft: "3%"
              }}>
                {inforCustomer.map((info, index) => (
                  <Typography
                    key={index}
                    sx={{
                      alignContent: "center",
                      // fontSize: "20px",
                      gap: "auto",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {info}
                  </Typography>
                ))}
              </Box>
              <Box sx={{
                marginRight: "4%"
              }}>
                <Button onClick={handleChange} sx={{ 
                  // fontSize: "20px"
                   }}>
                  Thay đổi
                </Button>
              </Box>
              
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              // marginBottom: "20px",
              background: "#fff",
              width: "90%",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                // marginTop: "20px",
                // background: "#fff",
                // height: "50vh",
                // width: "90vw",
                borderBottom: "none",
                boxShadow: "none",
                "& .MuiTable-root": {
                  borderBottom: "none",
                },
              }}
            >
              <Table
                sx={{
                  // marginLeft: "40px",
                  marginTop: "20px",
                  // marginRight: "40px",
                  // borderBottom: 'none',
                  // '& .MuiTableCell-root': {
                  //   borderBottom: 'none',
                  // }
                }}
              >
                <TableHead>
                  <TableRow sx={{}}>
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
                  {inforCake.map((cake) => (
                    <TableRow key={cake.id}>
                      <TableCell
                        sx={{ paddingLeft: "3%" }}
                        align="left"
                      >
                        {cake.name} | {cake.floor} | {cake.size} |{" "}
                        {cake.filling}
                      </TableCell>
                      <TableCell sx={{ }} align="center">
                        {cake.quantity}
                      </TableCell>
                      <TableCell sx={{}} align="center">
                        {cake.price}
                      </TableCell>
                      <TableCell sx={{}} align="center">
                        {cake.price * cake.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Box sx={{ 
              background: "#fff",
              // padding: "20px", 
              width: "90%", 
              margin: "0 auto",
            }}>
              <div style={{ 
                height: '1px', 
                borderBottom: '2px dashed rgba(0, 0, 0, 0.3)', 
                margin: '20px 0' 
              }} />
            </Box> */}

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
                    // fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Phí vận chuyển
                </Typography>
              </Box>
              <Box sx={{marginRight: "5.5%"}}>
                <Typography sx={{}} align="right">
                  {costDelivery}
                </Typography>
              </Box>
             
            </Box>

            <Box
              sx={{
                background: "#fff",
                // padding: "20px",
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
              <Box>
                <Typography
                  sx={{
                    // fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Thời gian nhận hàng
                </Typography>
              </Box>
              <Box sx={{
                marginRight: "4%"
              }}>
                <Typography sx={{ 
                  // fontSize: "20px" 
                }}>{time}</Typography>
              </Box>
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
                {calculateTotal()} VND
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
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho button
                  outline: "none",
                }}
              >
                Đặt hàng
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Payment;
