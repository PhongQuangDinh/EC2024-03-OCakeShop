import { Box, Button, TextField, Typography, Link } from "@mui/material";
import Layout from "../layout";
import Head from "next/head";
import SignUp from "@/modules/SignUp/signup";

const SignIn = () => {
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
              Đăng Nhập
            </Typography>
            <TextField
              label="Số điện thoại"
              variant="outlined"
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
            >
              Đăng Nhập
            </Button>
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
