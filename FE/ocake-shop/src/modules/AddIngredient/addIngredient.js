"use client"
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import Layout from "../layout";
import Image from "next/image";
import logo from "./../../app/image/logo.png";
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddIngredient = () => {

  const [selectedFilling, setSelectedFilling] = useState([]);

  const handleChangeFilling = (event) => {
    setSelectedFilling(event.target.value);
  }

  return (
    <Layout>
      <Box sx={{
        background: "#fff",
        // height: "175px",
        gap: "20px",
        marginTop: "100px",
      }}
      >  
        <Box sx={{
          display: "flex", 
          alignItems: "center",
          marginLeft: "200px",
          }}>
           {/* <Image priority src={logo} alt="logo" width={100} /> */}
           <Typography sx={{
              display:"flex",
              alignItems: "center",
              color: "#E82552",
              fontSize:"40px",
              fontWeight:"bold",
              fontFamily: "Montserrat, sans-serif",
            }}
            >
              OcakeShop | Thêm nguyên vật liệu
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
        <Box sx={{
          background: "#fff",
          width: "85%",
          marginTop: "50px",
          marginBottom: "50px",
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 200px 30px 100px",
          }}>
            <Box>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Tên nguyên liệu
              </Typography>
            </Box>
            <Box>
              <FormControl sx={{
                  width: "500px",
                }}>
                  <InputLabel sx={{
                      fontSize:"20px",
                    }} 
                    id="select-filling">Chọn nguyên liệu</InputLabel>
                  <Select
                    labelId="select-filling"
                    id="select-filling"
                    label="Filling"
                    value={selectedFilling}
                    onChange={handleChangeFilling}
                  >
                    <MenuItem value={"Chocolate"}>Sô cô la</MenuItem>
                    <MenuItem value={"Strawberry"}>Dâu tây</MenuItem>
                    <MenuItem value={"Matcha"}>Trà xanh</MenuItem>
                    <MenuItem value={"Pineapple"}>Dứa</MenuItem>
                    <MenuItem value={"Coffee"}>Cà phê</MenuItem>
                    <MenuItem value={"Cream Cheese"}>Kem phô mai</MenuItem>
                  </Select>
                </FormControl>
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 200px 30px 100px",
          }}>
            <Box>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Số lượng
              </Typography>
            </Box>
            <Box>
              <TextField sx={{
                id:"outlined-basic",
                width: "500px"
                }}
                label="Số lượng" />
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 200px 30px 100px",
          }}>
            <Box>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Đơn vị
              </Typography>
            </Box>
            <Box>
              <TextField sx={{
                id:"outlined-basic",
                width: "500px"
                }}
                label="Đơn vị" />
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 200px 30px 100px",
          }}>
            <Box>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Giá nguyên liệu
              </Typography>
            </Box>
            <Box>
              <TextField sx={{
                id:"outlined-basic",
                width: "500px"
                }}
                label="Giá nguyên liệu" />
            </Box>
          </Box>

          {/* <Box sx={{
            display: "flex"
          }}>
            <Typography sx={{
              color: "#000",
              fontSize:"30px",
              fontWeight:"bold",
              fontFamily: "Montserrat, sans-serif",
            }}>
              Hạn sử dụng
            </Typography>
            <TextField sx={{
              id:"outlined-basic",
              }}
              label="Hạn sử dụng" />
          </Box> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "30px 200px 30px 100px",
                // marginRight: "100px"
                // marginTop: "30px",
                // marginBottom: "30px",
                // marginLeft: "40px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Hạn sử dụng
                </Typography>
              </Box>
              <DatePicker
                sx={{width: "500px"}}
                label="Hạn sử dụng"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      marginLeft: 2,
                    }}
                  />
                )}
              />
            </Box>
          </LocalizationProvider>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
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
              Thêm
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddIngredient;
