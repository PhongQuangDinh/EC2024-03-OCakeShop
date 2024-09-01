"use client";
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CardMedia, styled } from "@mui/material";
import Layout from "../layout";
import Image from "next/image";
import logo from "./../../app/image/logo.png";
import React, { useState, useEffect } from 'react';
import { fetchWithAuth, getApiUrl } from '../../../WebConfig';
import { useRouter, useParams, useSearchParams  } from 'next/navigation';

const SelectCake = () => {
  const [cake, setCake] = useState(''); // State to hold cake information
  const [selectedSize, setSelectedSize] = useState(''); // State for size selection
  const [selectedFilling, setSelectedFilling] = useState('');
  const [selectedFloors, setSelectedFloors] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState(''); 
  const [size, setSize] = useState([]);
  const [filling, setFilling] = useState([]);
  const router = useRouter();
  const {cakeID} = useParams();
  const apiUrl = getApiUrl();
  
  useEffect(()=>{
    const fetchCake = async () => {
      try {
        const response = await fetch(`${apiUrl}/cake/${cakeID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`${apiUrl}/cake/${cakeID}`);
        if(!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Get cake by id is failed');
          return;
        }
        const data = await response.json();
        setCake(data);
      }
      catch (error) {
        setError(error);
        console.error('Failed to fetch' + error);
      }
    };
    fetchCake();
  }, [cakeID]);

  useEffect(()=>{
    const fetchSize = async () => {
      try {
        const response = await fetch(`${apiUrl}/cake/size`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`${apiUrl}/cake/size`);
        if(!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Get size is failed');
          return;
        }
        const data = await response.json();
        setSize(data);
      }
      catch(error){
        setError(error);
        console.log(error + "SOSSSSSSSSS");
      }
    }; fetchSize();
  }, []);

  useEffect(()=>{
    const fetchFilling = async () => {
      try {
        const response = await fetch(`${apiUrl}/cake/filling`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`${apiUrl}/cake/filling`);
        if(!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Get filling is failed');
          return;
        }
        // const data = await fetchWithAuth(router, `/cake/${cakeID}`);
        // if(!data){
        //   console.log("Not get filling");
        // }
        const data = await response.json();
        setFilling(data);
      }
      catch(error){
        setError(error);
        console.log(error + "SOSSSSSSSSS");
      }
    }; fetchFilling();
  }, []);

  const handleChangeSize = (event) => {
    setSelectedSize(event.target.value);
  }

  const handleChangeFilling = (event) => {
    setSelectedFilling(event.target.value);
  }

  const handleChangeFloors = (event) => {
    setSelectedFloors(event.target.value);
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }
  
  const handleChangeQuantity = (event) => {
    setSelectedQuantity(event.target.value);
  }

  const handleAddCart = async () => {
    if(!selectedFilling){
      console.log("Bạn hãy chọn nhân bánh");
      setError("Bạn hãy chọn nhân bánh");
      alert("Please select")
    }
    if(!selectedFloors){
      console.log("Bạn hãy nhập số tầng của bánh");
      setError("Bạn hãy nhập số tầng của bánh");
    }
    if(!selectedSize){
      console.log("Bạn hãy chọn kích thước bánh");
      setError("Bạn hãy chọn kích thước bánh");
    }
    console.log("Size: " + selectedSize + " Nhân: " + selectedFilling + " Tầng: " + selectedFloors);
  }

  const priceCake = cake ? cake.priceCake : 0;

  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "6px",
  }));

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
            paddingBottom: "30px"
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "60%",
              height: "60%",
              borderRadius: "6px",
            }}
            image={cake?.cakeImages?.[0]?.imageDetail?.imagePath || logo}
            alt="cake image"
          />

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
                  fontSize: "20px",
                }}
              >
                {cake ? cake.description : 'Loading...'}
              </Typography>
            </Box>

            <Box sx={{
              display: "flex",
              alignContent: "center",
              paddingTop: "40px",
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
              <TextField
                sx={{
                  width: "20vw",
                  fontSize: "30px",
                }}
                id="floor"
                label="Số tầng"
                value={selectedFloors}
                onChange={handleChangeFloors}
              />
            </Box>

            <Box sx={{
              display: "flex",
              alignContent: "center",
              paddingTop: "40px",
              gap: "115px"
            }}>
              <Typography sx={{
                color: "#000",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>
                Số lượng
              </Typography>
              <TextField
                sx={{
                  width: "20vw",
                  fontSize: "30px",
                }}
                id="floor"
                label="Số lượng"
                value={selectedQuantity}
                onChange={handleChangeQuantity}
              />
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
              <FormControl sx={{
                width: "20vw",
              }}>
                <InputLabel sx={{
                    fontSize: "20px",
                }} 
                   id="select-size">Nhân</InputLabel>
                <Select
                  labelId="select-size"
                  id="select-size"
                  label="Size"
                  value={selectedFilling}
                  onChange={handleChangeFilling}
                >
                  {filling.map((item) => (
                    <MenuItem key={item?.cakeFillingID} value={item?.title}>
                      {item.title}
                    </MenuItem>))}
                </Select>
              </FormControl>
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
                  {size.map((item) => (
                    <MenuItem key={item?.cakeSizeID} value={item?.title}>
                      {item.title} cm
                    </MenuItem>))}
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
              display: "flex",
              alignContent: "center",
              justifyContent: "center"
            }}>
              {error && (!selectedFloors || !selectedFilling  || !selectedSize) &&<Typography color="error">{error}</Typography>}
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
                fontFamily: "Montserrat, sans-serif",
                outline: "none",
              }}
              onClick={handleAddCart}
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
