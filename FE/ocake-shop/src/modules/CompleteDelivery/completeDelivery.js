"use client"
import { Box, Typography, Grid, Button } from "@mui/material";
import Layout from "../layout";
import React, { useState } from "react";

const CompleteDelivery = () => {
  
  const [inforDelivery, setInforDelivery] = useState([
    {id: 1, idOrder: "001", name: "Phạm Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 2, idOrder: "002", name: "Phạm Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 3, idOrder: "003", name: "Phạm Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
  ]);

  const columnStyles = {
    // width: "10%", // Adjust this value based on the number of columns
    textAlign: "center",
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
              // padding: "90px",
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
              OcakeShop | Đơn mua
            </Typography>
          </Box>
        </Box>
        <Box sx={{
           background: "#E5E5E5",
           fontFamily: "Monospace, sans-serif",
           paddingTop: "50px"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45%",
            }}>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
              }}>Đang xử lý</Typography>
            </Box>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "underline",
                color: "#EA365F"
              }}>Đã hoàn thành</Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{
              justifyContent: "center",
              display: "flex",
            }}>
              <Box sx={{ marginTop: "20px",
                width: "91%",
                // display: "flex",
               }}>
                <Grid sx={{
                  backgroundColor: "#fff",
                  padding: "0, 10px"
                }} container columnGap={32} justifyContent="space-between">
                  <Grid item>
                    <Typography sx={{columnStyles}}>
                      Đơn hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{columnStyles}}>
                      Tên khách hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{columnStyles}}>
                      Số điện thoại
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{columnStyles}}>
                      Thời gian nhận hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{columnStyles}}>
                      Xác nhận giao hàng
                    </Typography>
                  </Grid>
                </Grid>
                <Box>
                  {inforDelivery.map((item) => (
                    <Grid sx={{
                      marginTop: "20px",
                      // alignItems: "center",
                      backgroundColor: "#fff",
                      padding: "10px 0", 
                    }} container columnGap={32} key={item.id} justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography sx={{columnStyles}}>
                          {item.idOrder}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{columnStyles}}>
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{columnStyles}}>
                          {item.phoneNumber}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{columnStyles}}>
                          {item.time}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button>Đã xác nhận</Button>
                      </Grid>
                    </Grid>
                  ))}
                  </Box>
              </Box>
              {/* <Box>
              {inforDelivery.map((item) => (
                <Grid container spacing={32} key={item.id} alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.idOrder}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button>Xác nhận</Button>
                  </Grid>
                </Grid>
              ))}
              </Box> */}
            </Box>  
          </Box>
        </Box>
      </Box>
      <Box sx={{
        paddingTop: "50px",
        background: "#E5E5E5",
      }}>

      </Box>
    </Layout>
  );
};

export default CompleteDelivery;
