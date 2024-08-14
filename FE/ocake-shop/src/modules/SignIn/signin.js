"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);
      window.location.href = '/home';

    } catch (err) {
      // console.error('An error occurred:', err);
      setError('Invalid username or password');
    }
  };
  return (
    <div>
      <Head>
        <title>Đăng Nhập - OCake Shop</title>
        <link rel="icon" href="/icon.png" />
        <link href="https://cdn.jsdelivr.net/npm/fontsource-montserrat@latest" rel="stylesheet" />
      </Head> 
      <Layout>
        <Box
          sx={{
            background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontFamily: "Monospace, sans-serif",
          }}
        >
          <Box
            sx={{
              background: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              width: "500px",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: "#e82652", fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}>
              Đăng Nhập
            </Typography>
            <TextField
              label="Số điện thoại"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị của username
              sx={{ 
                marginBottom: 2, 
                width: "100%",
                "& .MuiOutlinedInput-root": { 
                  "& fieldset": {
                    borderColor: "#e82652", 
                  },
                  "&:hover fieldset": { 
                    borderColor: "#FFC0CB", 
                  },
                  "& input": { 
                    color: "#000000",
                    fontFamily: "Montserrat, Monospace",
                  },
                  "&:hover input": { 
                    color: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e82652",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  outline: "none",
                },
                "& label.Mui-focused": {
                  color: "#e82652",
                  fontFamily: "Montserrat, sans-serif",
                },
              }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị của password
              sx={{ 
                marginBottom: 2, 
                width: "100%",
                "& .MuiOutlinedInput-root": { 
                  "& fieldset": {
                    borderColor: "#e82652", 
                  },
                  "&:hover fieldset": { 
                    borderColor: "#FFC0CB", 
                  },
                  "& input": { 
                    color: "#000000",
                    fontFamily: "Montserrat, sans-serif",
                  },
                  "&:hover input": { 
                    color: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e82652",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  outline: "none",
                },
                "& label.Mui-focused": {
                  color: "#e82652",
                  fontFamily: "Montserrat, sans-serif",
                },
              }}
            />
            <Button 
              variant="contained" 
              sx={{ 
                width: "100%", 
                marginBottom: 2, 
                backgroundColor: "#FFDFE7", 
                color: "#000000", 
                border: "1px solid #e82652", 
                "&:hover": { 
                  backgroundColor: "#FFC0CB", 
                  color: "#000000" 
                },
                fontFamily: "Montserrat, sans-serif",
                outline: "none",
              }}
              onClick={handleSignIn} // Xử lý sự kiện khi nhấn nút
            >
              Đăng Nhập
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Link href="#" underline="none" sx={{ display: "block", marginBottom: 2, fontFamily: "Montserrat, sans-serif" }}>
              Quên mật khẩu
            </Link>
            <Typography variant="body2" sx={{ marginBottom: 2, fontFamily: "Montserrat, sans-serif" }}>
              HOẶC
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif" }}>
              Bạn chưa có tài khoản ở OCake Shop?{" "}
              <Link href="/signup" underline="none" color="#e82652" sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Đăng ký
              </Link>
            </Typography>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default SignIn;
