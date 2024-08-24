"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../layout";
import Head from "next/head";
import Link from 'next/link';
import React, { useState } from 'react';
import {useRouter} from "next/navigation";

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
        return;
      }

      const data = await response.json();
      alert('Response data: Đăng ký thành công ', data.token);
      localStorage.setItem("token", data.token);
      // window.location.href = '/home';
      router.push("/home");

    } catch (error) {
        setError('Invalid username or password');
    }
  }

  return (
    <div>
      <Head>
        <title>Đăng Ký - OCake Shop</title>
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
            fontFamily: "Monospace, sans-serif", // Áp dụng font Montserrat cho toàn bộ component này
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
              Đăng Ký
            </Typography>
            <TextField
              label="Số điện thoại"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                    fontFamily: "Montserrat, Monospace", // Áp dụng font Montserrat cho input
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
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
                },
              }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                    fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho input
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
                  fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho label khi focus
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
                fontFamily: "Montserrat, sans-serif", // Áp dụng font Montserrat cho button
                outline: "none",
              }}
              onClick={handleSignUp}
            >
              Đăng Ký
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Link href="#" underline="none" sx={{ display: "block", marginBottom: 2, fontFamily: "Montserrat, sans-serif" }}></Link>
            <Typography variant="body2" sx={{ marginBottom: 2, fontFamily: "Montserrat, sans-serif" }}>
              HOẶC
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif" }}>
              Bạn đã có tài khoản ở OCake Shop?{" "}
              <Link href="/signin" underline="none" color="#e82652" sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default SignUp;
