"use client"
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Tab, Tabs } from '@mui/material';
import Layout from "../layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getApiUrl, fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';
import Link from "next/link";

function createData(name, quantity, deliveryDate) {
  return { name, quantity, deliveryDate };
}

const handleConfirm = () => {
  // Handle save changes
  // console.log('Changes saved:', formData);
};

const initialRows = [
  createData(
    "Bánh kem sinh nhật hồng cho bé gái | 2 tầng | 24cm, 20cm | Chocolate",
    1
  ),
  createData(
    "Bánh kem xanh cho bé trai | 1 tầng | 24cm | Phô mai",
    1
  ),
  createData("Bánh kem 8/3 | 1 tầng | 22cm | Chocolate", 1),
  createData("Bánh kem 14/2 | 1 tầng | 20cm | Vani", 1),
];

export default function PurchaseOrderProcess() {
  const [rows, setRows] = useState(initialRows);
  const [value, setValue] = useState(0);
  // const [valueHandleDelivery, setValueHandleDelivery] = useState([]);
  const [valueCompleteDelivery, setValueCompleteDelivery] = useState([]);
  const [error, setError] = useState('');  
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const fetchCompleteDelivery = async () => {
      try {
        const response = await fetchWithAuth(router, '/ordercake/cus-received');
        if(!response){
          setError('Error fetching data');
        }
        setValueCompleteDelivery(response);
        console.log(response);
      }
      catch (error) {
        setError(error);
        console.log(error+" Not get handleDelivery");
      }
    };
    fetchCompleteDelivery();
  }, []);

  return (
    <Layout>
      <Box sx={{
        background: "#fff",
        gap: "20px",
        marginTop: "100px",
      }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "200px",
        }}>
          <Typography sx={{
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

      {/* Grey Box */}
      <Box sx={{
        background: "#E5E5E5",
        alignItems: "center",
        paddingLeft: "10%", paddingRight: "10%",
        paddingTop: "1%", paddingBottom: "5%"
      }}>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Link href="/purchaseorder-process" passHref>
                <Typography sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  // textDecoration: "underline",
                  // color: "#EA365F"
                }}>Đang xử lý</Typography>
              </Link>
            </Box>
            <Box sx={{
              backgroundColor: "#fff",
              height: "70px",
              width: "50%",
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
          <Box sx={{
          marginTop: "20px",
          }}></Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Xác nhận giao hàng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {valueCompleteDelivery.map((row, index) => (
                <TableRow
                  key={row.OrderDetails.OrderCart.cakeSize.title}
                >
                  <TableCell align="center"></TableCell>
                  <TableCell component="th" scope="row">
                    {row?.OrderDetails?.OrderCart?.cakeSize?.title}
                  </TableCell>
                  <TableCell align="center">{row.OrderDetails.OrderCart.quantity}</TableCell>
                  <TableCell align="center">
                    <Button sx={{
                      width: "150px",
                      background: "#FFDFE7",
                      color: "black",
                    }}
                      variant="contained" color="primary" onClick={handleConfirm}> Xác nhận </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout >
  );
};