"use client";

import Layout from "../layout";
import { useParams, useSearchParams } from 'next/navigation'; // Import useParams for dynamic segment
import { Box, Typography } from "@mui/material";

const PaymentStatus = () => {
  const { status } = useParams(); // Capture the dynamic segment as status
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const PayerID = searchParams.get('PayerID');

  const renderStatusMessage = () => {
    if (status === "CONTINUE-ORDER" && token && PayerID) {
      return <Typography sx={{ fontSize: "30px", fontWeight: "bold", textDecoration: "underline", color: "#EA365F" }}>
        Đã hoàn thành</Typography>;
    } else if (status === "CANCEL-ORDER") {
      return <Typography sx={{ fontSize: "30px", fontWeight: "bold", textDecoration: "underline", color: "#EA365F" }}>
        Đã hủy đơn hàng</Typography>;
    } else {
      return <Typography sx={{ fontSize: "30px", fontWeight: "bold", textDecoration: "underline", color: "#EA365F" }}>
        Trạng thái đơn hàng không hợp lệ</Typography>;
    }
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
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {renderStatusMessage()}
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}>
            {/* Additional content can go here */}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default PaymentStatus;
