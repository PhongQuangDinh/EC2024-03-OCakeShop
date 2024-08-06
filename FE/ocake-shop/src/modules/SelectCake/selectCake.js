"use client"
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import Layout from "../layout";
import Image from "next/image";
import logo from "./../../app/image/logo.png";
import React, { useState } from 'react';

const SelectCake = () => {

  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedFilling, setSelectedFilling] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);

  const handleChangeSize = (event) => {
    setSelectedSize(event.target.value);
  }

  const handleChangeFloors = (event) => {
    setSelectedFloors(event.target.value);
  }

  const handleChangeFilling = (event) => {
    setSelectedFilling(event.target.value);
  }

  const priceCake = 130000;

  return (
    <Layout>
      <Box sx={{ 
        background: "#fff",
        height: "175px",
        gap: "20px"
      }}
      >  
        <Box sx={{
          display: "flex", 
          alignItems: "center",
          padding: "90px",
          paddingLeft: "200px"
          }}>
           <Typography sx={{
              display:"flex",
              alignItems: "center",
              color: "#E82552",
              fontSize:"40px",
              fontWeight:"bold",
              fontFamily: "Montserrat, sans-serif",
            }}
            >
              OcakeShop | Chi tiết bánh
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
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image priority src={logo} alt="logo" width={600} />
        </Box>
        <Box sx={{
          background: "#fff",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
          paddingTop: "40px",
          paddingBottom: "40px",
          marginBottom: "50px"
        }}>
          <Box sx={{}}>
            <Box sx={{
              display: "flex",
              gap: "115px",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Tên bánh
              </Typography>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontFamily: "Montserrat, sans-serif",
              }}>
                <TextField
                sx={{
                    width: "20vw",
                    fontSize: "40px",
                }}
                  hiddenLabel
                  defaultValue="Bánh kem cho bé trai"
                />
              </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              alignContent: "center",
              paddingTop: "20px",
              gap: "90px"
              
            }}>
              <Box sx={{
                display: "flex",
                gap: "140px"
              }}>
                <Typography sx={{
                  color: "#000",
                  fontSize:"30px",
                  fontWeight:"bold",
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  Số tầng
                </Typography>
                <FormControl sx={{
                  width: "20vw",
                }}>
                  <InputLabel sx={{
                    fontSize:"20px",
                    id:"select-tang",

                  }}>
                    Số tầng</InputLabel>
                  <Select
                  sx={{
                    fontSize: "20px",
                  }}
                    labelId="select-floor"
                    id="select-floor"
                    value={selectedFloors}
                    label="Floor"
                    onChange={handleChangeFloors}
                  >
                    <MenuItem value={1}>Một tầng</MenuItem>
                    <MenuItem value={2}>Hai tầng</MenuItem>
                    <MenuItem value={3}>Ba tầng</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{
                display: "flex",
                gap: "50px"
              }}>
                <Typography sx={{
                  color: "#000",
                  fontSize:"30px",
                  fontWeight:"bold",
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  Size bánh kem
                </Typography>
                <FormControl sx={{
                  width: "20vw",
                }}>
                  <InputLabel sx={{
                    fontSize:"20px",
                  }} 
                  id="select-size">Size bánh</InputLabel>
                  <Select 
                    labelId="select-size"
                    id="size"
                    value={selectedSize}
                    label="size"
                    onChange={handleChangeSize}
                  >
                    <MenuItem value={16}>16 cm</MenuItem>
                    <MenuItem value={18}>18 cm</MenuItem>
                    <MenuItem value={20}>20 cm</MenuItem>
                    <MenuItem value={22}>22 cm</MenuItem>
                    <MenuItem value={24}>24 cm</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
            <Box sx={{
              display: "flex",
              paddingTop: "20px",
              gap: "25px",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize:"30px",
                fontWeight:"bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Nhân bánh kem
              </Typography>
              <FormControl sx={{
                width: "20vw",
              }}>
                <InputLabel sx={{
                    fontSize:"20px",
                  }} 
                   id="select-filling">Nhân bánh kem</InputLabel>
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
              marginTop: "30px",
              alignContent: 'center',
              display: "flex",
              gap: "10px"
            }}>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold"
              }}>
                Giá
              </Typography>
              <Typography sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#FF0000"
              }}>
                {priceCake}
              </Typography>
            </Box>
          <Box sx={{
            marginTop: "30px",
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
                  Thêm vào giỏ
                </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default SelectCake;