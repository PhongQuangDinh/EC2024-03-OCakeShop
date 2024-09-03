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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

const initialMachines = [
  { bakingMachineID: 1, title: "Máy 1", status: "Bận", quantityCake: 3 },
  { bakingMachineID: 2, title: "Máy 2", status: "Bận", quantityCake: 3 },
  { bakingMachineID: 3, title: "Máy 3", status: "Rảnh", quantityCake: 3 },
  { bakingMachineID: 4, title: "Máy 4", status: "Rảnh", quantityCake: 3 },
  { bakingMachineID: 5, title: "Máy 5", status: "Rảnh", quantityCake: 3 },
];
function CakeProcess() {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openMachineConfirmDialog, setOpenMachineConfirmDialog] = useState(false);
  const [openNotEnoughCakeDialog, setOpenNotEnoughCakeDialog] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [machineToStart, setMachineToStart] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');

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
    setSelectedMachine(selectedMachine); // Update selectedMachine state
  };

  const handleStatusChange = (id, newStatus) => {
    const item = data.find((item) => item.id === id);
    if (!item) return;

    const newData = data.map((item) =>
      item.machine === item.machine && item.status === "Đang xử lý"
        ? { ...item, status: newStatus }
        : item
    );
    setData(newData);
  };

  
const handleStartProcessing = (machine) => {
  const itemsToStart = data.filter(
    (item) => item.machine === machine && item.status === "Chưa xử lý"
  );

  const machineData = initialMachines.find((m) => m.title === machine);

  if (!machineData) {
    setSnackbarMessage(`Máy ${machine} không tồn tại.`);
    setOpenSnackbar(true);
    return;
  }

  const totalQuantity = itemsToStart.reduce((sum, item) => sum + item.quantity, 0);

  if (!machine) {
    setSnackbarMessage("Bạn phải chọn máy trước khi bắt đầu.");
    setOpenSnackbar(true);
    return;
  }

  if (totalQuantity < machineData.quantityCake) {
    setMachineToStart(machine);
    setOpenNotEnoughCakeDialog(true);
  } else if (totalQuantity > machineData.quantityCake) {
    setSnackbarMessage(`${machineData.title} không đủ chỗ cho ${totalQuantity} bánh. Vui lòng bỏ bớt bánh.`);
    setOpenSnackbar(true);
  } else {
    setMachineToStart(machine);
    setOpenMachineConfirmDialog(true);
  }
};

  const handleOpenConfirmDialog = (id) => {
    setCurrentItemId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = (confirm) => {
    if (confirm && currentItemId !== null) {
      const currentItem = data.find((item) => item.id === currentItemId);
      if (currentItem) {
        const newData = data.map((item) =>
          item.machine === currentItem.machine && item.status === "Đang xử lý"
            ? { ...item, status: "Kết thúc" }
            : item
        );
        setData(newData);
      }
    }
    setOpenConfirmDialog(false);
  };

  const handleCloseMachineConfirmDialog = (confirm) => {
    if (confirm && machineToStart) {
      const newData = data.map((item) =>
        item.machine === machineToStart && item.status === "Chưa xử lý"
          ? { ...item, status: "Đang xử lý" }
          : item
      );
      setData(newData);
    }
    setOpenMachineConfirmDialog(false);
  };

  const handleCloseNotEnoughCakeDialog = (confirm) => {
    if (confirm) {
      handleCloseMachineConfirmDialog(true); // Automatically confirm machine start
    }
    setOpenNotEnoughCakeDialog(false);
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
        <Box sx={{ height: "90px", backgroundColor: "#FBF0D4" }} />
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
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="center">
                    {row.status === "Chưa xử lý" && row.machine && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartProcessing(row.machine)}
                        disabled={!row.machine}
                      >
                        Bắt đầu
                      </Button>
                    )}
                    {row.status === "Đang xử lý" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenConfirmDialog(row.id)}
                      >
                        Kết thúc
                      </Button>
                    )}
                    {row.status === "Kết thúc" && (
                      <Button variant="text" color="secondary" disabled>
                        Đã hoàn thành
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openMachineConfirmDialog}
          onClose={() => handleCloseMachineConfirmDialog(false)}
        >
          <DialogTitle>Xác nhận bắt đầu làm bánh</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn bắt đầu làm bánh với máy {machineToStart}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleCloseMachineConfirmDialog(false)}
              color="primary"
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleCloseMachineConfirmDialog(true)}
              color="secondary"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNotEnoughCakeDialog}
          onClose={() => handleCloseNotEnoughCakeDialog(false)}
        >
          <DialogTitle>Số lượng bánh chưa đủ</DialogTitle>
          <DialogContent>
            <Typography>
              Số lượng bánh chưa đủ để bắt đầu làm bánh với máy {machineToStart}.
              Bạn có muốn quay lại chọn thêm bánh hoặc tiếp tục làm bánh không?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleCloseNotEnoughCakeDialog(false)}
              color="primary"
            >
              Quay lại chọn thêm
            </Button>
            <Button
              onClick={() => handleCloseNotEnoughCakeDialog(true)}
              color="secondary"
            >
              Xác nhận làm bánh
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openConfirmDialog}
          onClose={() => handleCloseConfirmDialog(false)}
        >
          <DialogTitle>Xác nhận kết thúc</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn kết thúc làm bánh cho sản phẩm này?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleCloseConfirmDialog(false)}
              color="primary"
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleCloseConfirmDialog(true)}
              color="secondary"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </Layout>
  );
}

export default CakeProcess;
