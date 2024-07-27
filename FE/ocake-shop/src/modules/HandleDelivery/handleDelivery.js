"use client"
import { Box, Typography, Grid, Button } from "@mui/material";
import Layout from "../layout";
import React, { useState } from "react";

const Handling = () => {

  const [inforDelivery, setInforDelivery] = useState([
    {id: 1, idOrder: "001", name: "Phạm Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 2, idOrder: "002", name: "Phạm Trần Thị Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
    {id: 3, idOrder: "003", name: "Phạm Uyễn Nhi", phoneNumber: "0123231211", time: "12/6/2024"},
  ]);

  const columnStyles = {
    textAlign: "center",
    flexGrow: 1,
    flexBasis: 0,
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
              OcakeShop | Giao đơn hàng
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
               }}>
                <Grid sx={{
                  backgroundColor: "#fff",
                  padding: "0 10px",
                }} container spacing={2}>
                  <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography>
                      Đơn hàng
                    </Typography>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography>
                      Tên khách hàng
                    </Typography>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography>
                      Số điện thoại
                    </Typography>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography>
                      Thời gian nhận hàng
                    </Typography>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography>
                      Xác nhận giao hàng
                    </Typography>
                  </Grid>
                </Grid>
                <Box>
                  {inforDelivery.map((item) => (
                    <Grid sx={{
                      marginTop: "20px",
                      backgroundColor: "#fff",
                      padding: "10px 0", 
                    }} container spacing={2} key={item.id} alignItems="center">
                      <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography>
                          {item.idOrder}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography>
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography>
                          {item.phoneNumber}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography>
                          {item.time}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
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
                          Xác nhận
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
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

export default Handling;