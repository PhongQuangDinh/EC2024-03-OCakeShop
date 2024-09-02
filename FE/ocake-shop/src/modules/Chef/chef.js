"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import Layout from "../layout";
import { fetchWithAuth } from "../../../WebConfig";

const initialData = [
  {
    id: 1,
    name: "Bánh kem vani",
    size: 20,
    quantity: 4,
    machine: "Máy 1",
    status: "Đang xử lý",
  },
  {
    id: 2,
    name: "Bánh kem socola",
    size: 20,
    quantity: 4,
    machine: "Máy 2",
    status: "Đang xử lý",
  },
  {
    id: 3,
    name: "Bánh kem vani",
    size: 20,
    quantity: 1,
    machine: "",
    status: "Chưa xử lý",
  },
  {
    id: 4,
    name: "Bánh kem socola",
    size: 20,
    quantity: 1,
    machine: "",
    status: "Chưa xử lý",
  },
  {
    id: 5,
    name: "Bánh kem vani",
    size: 16,
    quantity: 4,
    machine: "",
    status: "Chưa xử lý",
  },
  {
    id: 6,
    name: "Bánh kem socola",
    size: 16,
    quantity: 8,
    machine: "",
    status: "Chưa xử lý",
  },
  {
    id: 7,
    name: "Bánh kem dừa",
    size: 16,
    quantity: 9,
    machine: "",
    status: "Chưa xử lý",
  },
];

function CakeProcess() {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchCakeRecipe = async () => {
      try {
        const data = await fetchWithAuth(router, "/recipe");
        setData(data || "");
        console.log(data);
      } catch (err) {
        setError("SOS " + err.message);
      }
    };

    fetchCakeRecipe();
  }, []);

  const handleMachineChange = (event, id) => {
    const selectedMachine = event.target.value;
    const isMachineInUse = data.some(
      (item) => item.machine === selectedMachine && item.status === "Đang xử lý"
    );

    if (isMachineInUse) {
      setSnackbarMessage(
        `Máy ${selectedMachine} đang được sử dụng. Vui lòng chọn máy khác.`
      );
      setOpenSnackbar(true);
      return;
    }

    const newData = data.map((item) =>
      item.id === id ? { ...item, machine: selectedMachine } : item
    );
    setData(newData);
  };

  const handleStatusChange = (id, newStatus) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(newData);
  };

  const handleStartProcessing = (id) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, status: "Đang xử lý" } : item
    );
    setData(newData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const machinesInUse = new Set(
    data
      .filter((item) => item.status === "Đang xử lý")
      .map((item) => item.machine)
  );

  return (
    <Layout>
      <Box sx={{ background: "#E5E5E5", minHeight: "100vh", padding: "0px" }}>
        <Box sx={{ height: "90px", backgroundColor: "#FBF0D4" }} />{" "}
        {/* Viền màu vàng trên đầu */}
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{
            marginTop: "30px",
            marginLeft: "320px",
            color: "#E82552",
            fontWeight: "bold",
          }}
        >
          Ocake Shop | Bếp làm bánh
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ margin: "auto", maxWidth: "1200px", marginTop: "30px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tên sản phẩm
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Kích thước
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Số lượng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Máy nướng bánh
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Trạng thái làm bánh
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.size}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={row.machine}
                      onChange={(e) => handleMachineChange(e, row.id)}
                      displayEmpty
                      sx={{ minWidth: 120 }}
                      disabled={row.status === "Đang xử lý"}
                    >
                      <MenuItem value="">Chưa xử lý</MenuItem>
                      {["Máy 1", "Máy 2", "Máy 3", "Máy 4", "Máy 5"].map(
                        (machine) => (
                          <MenuItem
                            key={machine}
                            value={machine}
                            disabled={machinesInUse.has(machine)}
                          >
                            {machine}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        row.status === "Đang xử lý"
                          ? "blue"
                          : row.status === "Kết thúc"
                          ? "red"
                          : "black",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="center">
                    {row.status === "Chưa xử lý" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartProcessing(row.id)}
                      >
                        Bắt đầu
                      </Button>
                    )}
                    {row.status === "Đang xử lý" && (
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => handleStatusChange(row.id, "Kết thúc")}
                      >
                        Kết thúc
                      </Button>
                    )}
                    {row.status === "Kết thúc" && (
                      <Button variant="text" color="secondary" disabled>
                        Hoàn thành
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
      <Box sx={{ paddingTop: "20px", background: "#E5E5E5" }}></Box>
    </Layout>
  );
}

export default CakeProcess;
