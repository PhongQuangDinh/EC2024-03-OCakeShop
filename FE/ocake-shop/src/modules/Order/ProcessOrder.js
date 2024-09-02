"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../layout";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { getApiUrl, fetchWithAuth } from '../../../WebConfig';
import { useRouter } from 'next/navigation';

export default function ProcessOrder() {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState(0);
  const [movingRowIndex, setMovingRowIndex] = useState(null);
  const apiUrl = getApiUrl();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdate = async () => {
    try {
      const data = await fetchWithAuth(router, '/ordercake/manage/update', {
        method: "POST",
        body: JSON.stringify(rows),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   setError('No token found, please log in again.');
      //   router.push(`/signin?message=${encodeURIComponent('Your session has expired')}`);
      //   return;
      // }
      // const response = await fetch(`${apiUrl}/ordercake/manage/update`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`
      //   },
      //   body: JSON.stringify(rows),
      // });

      // if (!response.ok) {
      //   const contentType = response.headers.get("content-type");
      //   if (contentType && contentType.includes("application/json")) {
      //     const errorData = await response.json();
      //     setError(errorData.message || 'Failed to update profile.');
      //   } else {
      //     const errorText = await response.text();
      //     setError(errorText || 'An error occurred.');
      //   }
      //   return;
      // }

      // const data = await response.json();
      // alert('Cập nhật thành công!');
      window.location.reload();
      // router.push('/profile');
    } catch (error) {
      setError("Cập nhật thất bại: " + error.message);
    }
  };

  const fetchOrder = async() => {
    try {
      const data = await fetchWithAuth(router, '/ordercake/manage');
            console.log(data);
      setRows(data || '');

    } catch (err) {
      // console.log('SOSSSSSSS  '+err);
      if (err.message.includes("Failed to fetch")) {
        setError("The service is unavailable, please wait.");
      } else {
        
        setError('SOS: ' + err.message);
      }
    }
  }

  const moveRow = (index, direction) => {
    const newRows = [...rows];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newRows.length) {
      
      const tempArrange = newRows[index].arrange;
      newRows[index].arrange = newRows[targetIndex].arrange;
      newRows[targetIndex].arrange = tempArrange;

      const temp = newRows[targetIndex];
      newRows[targetIndex] = newRows[index];
      newRows[index] = temp;
      setRows(newRows);
      setMovingRowIndex(targetIndex);
      setTimeout(() => setMovingRowIndex(null), 300);
    }
  };

  useEffect(() => {
    fetchOrder()
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
          height: "100vh",
          padding: "7% 10%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Trạng thái xử lý đơn</TableCell>
                <TableCell align="center">Trạng thái làm bánh</TableCell>
                <TableCell align="center">Thời gian giao hàng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.arrange}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      movingRowIndex === index
                        ? "translateY(10px)"
                        : "translateY(0)",
                  }}
                >
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <IconButton
                        disableRipple="true"
                        onClick={() => moveRow(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        disableRipple="true"
                        onClick={() => moveRow(index, "down")}
                        disabled={index === rows.length - 1}
                      >
                        <ArrowDownward />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {"Bánh kem nhân " + row.OrderCart?.cakeFilling.title + " kích thước "+ row.OrderCart?.cakeSize.title}
                  </TableCell>
                  <TableCell align="center">{row.OrderCart?.quantity}</TableCell>
                  <TableCell align="center">{row.handleStatus}</TableCell>
                  <TableCell align="center">{row.bakingStatus ? row.bakingStatus: "Chưa xử lý"}</TableCell>
                  <TableCell align="center">{new Date(row.OrderDetails?.pickUpTime).toLocaleDateString('vi-VN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleUpdate}
            sx={{
              padding: "0.5rem 2rem",
              border: "solid 2px #E82451",
              color: "#000",
              backgroundColor: "#FFDFE7",
              "&:~hover": {
                backgroundColor: "#F7BBCA !important",
              },
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}