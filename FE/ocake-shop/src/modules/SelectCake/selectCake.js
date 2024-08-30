"use client";
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import Layout from "../layout";
import Image from "next/image";
import logo from "./../../app/image/logo.png";
import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';

const SelectCake = () => {
  const [cake, setCake] = useState(''); // State to hold cake information
  const [selectedSize, setSelectedSize] = useState(''); // State for size selection
  const [selectedFloors, setSelectedFloors] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState(''); 
  const cakeId = 1;
  const router = useRouter();
  // if (cakeId){
  //   useEffect(() => {
  //     const fetchCakeInfo = async () => {
  //       try {
  //         const response = await fetch(router, `/cake/${cakeId}`); // Replace '1' with the actual cake ID
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch cake information');
  //         }
  //         const data = await response.json();
  //         setCake(data);
  //         setSelectedSize(data.cakeSizeID); // Initialize size from API data
  //       } catch (error) {
  //         console.error('Error fetching cake info:', error);
  //       }
  //     };
  
  //     fetchCakeInfo();
  //   }, []);
  // }

  useEffect(()=>{
    const fetchCake = async () => {
      try {
        const data = await fetchWithAuth(router, `/cake/${id}`);
        if(!data){
          console.log("Not get Cake");
        }
        setCake(data);
      }
      catch (error) {
        setError(error);
        console.error('Failed to fetch' + error);
      }
    };
    fetchCake();
  }, []);

  const handleChangeSize = (event) => {
    setSelectedSize(event.target.value);
  }

  const handleChangeFloors = (event) => {
    setSelectedFloors(event.target.value);
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }

  const priceCake = cake ? cake.priceCake : 0; // Use price from cake data if available

  return (
    <Layout>
      <Box sx={{ 
        background: "#fff",
        height: "175px",
        gap: "20px"
      }}>
        <Box sx={{
          display: "flex", 
          alignItems: "center",
          padding: "90px",
          paddingLeft: "200px"
        }}>
          <Typography sx={{
            display: "flex",
            alignItems: "center",
            color: "#E82552",
            fontSize: "40px",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
          }}>
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
          <Box>
            <Box sx={{
              display: "flex",
              gap: "115px",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Tên bánh
              </Typography>
              <Typography
                sx={{
                  width: "20vw",
                  fontSize: "30px",
                }}
              >
                {cake ? cake.description : 'Loading...'}
              </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              alignContent: "center",
              paddingTop: "40px",
              gap: "90px"
            }}>
              <Box sx={{
                display: "flex",
                gap: "140px"
              }}>
                <Typography sx={{
                  color: "#000",
                  fontSize: "30px",
                  fontWeight: "bold",
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  Số tầng
                </Typography>
                <FormControl sx={{
                  width: "20vw",
                }}>
                  <InputLabel sx={{
                    fontSize: "20px",
                    id: "select-tang",
                  }}>
                    Tầng
                  </InputLabel>
                  <Select
                    sx={{
                      fontSize: "16px",
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
            </Box>

            <Box sx={{
              display: "flex",
              paddingTop: "20px",
              gap: "25px",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Nhân bánh kem
              </Typography>
              <Typography sx={{
                width: "20vw",
                fontSize: "30px",
              }}>
                {cake ? cake.cakeFillingID : 'Loading...'}
              </Typography>
            </Box>
            
            <Box sx={{
              display: "flex",
              paddingTop: "20px",
              gap: "40px",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Size bánh kem
              </Typography>
              <FormControl sx={{
                width: "20vw",
              }}>
                <InputLabel sx={{
                    fontSize: "20px",
                }} 
                   id="select-size">Size</InputLabel>
                <Select
                  labelId="select-size"
                  id="select-size"
                  label="Size"
                  value={selectedSize}
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

            <Box sx={{
              display: "flex",
              paddingTop: "20px",
              gap: "140px",
              marginLeft: "auto",
            }}>
              <Typography sx={{
                color: "#000",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Ghi chú
              </Typography>
              <TextField
                sx={{
                  width: "20vw",
                  fontSize: "30px",
                }}
                id="note"
                label="Ghi chú"
                value={note}
                onChange={handleNoteChange}
              />
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
