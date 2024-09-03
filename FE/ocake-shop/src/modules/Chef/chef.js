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
  Grid,
} from "@mui/material";
import Layout from "../layout";
import { fetchWithAuth } from "../../../WebConfig";
import { useRouter } from "next/navigation";

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
  const [cake, setCake] = useState([]);
  const [machine, setMachine] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    const fetchCake =async () => {
      try{
        const data = await fetchWithAuth(router, "/recipe/cake");
        if(!data){
          console.log("Dont have cake");
          return;
        }
        console.log(data);
        setCake(data || "");
      }
      catch(error){
        setError(error.message);
        console.log(error+ " SOSSSSSS");
      }
    };
    fetchCake();
  }, []);

  useEffect(() => {
    const fetchMachine =async () => {
      try{
        const data = await fetchWithAuth(router, "/recipe/machine");
        if(!data){
          console.log("Dont have cake");
          return;
        }
        console.log(data);
        setMachine(data || "");
      }
      catch(error){
        setError(error.message);
        console.log(error+ " SOSSSSSS");
      }
    };
    fetchMachine();
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
        {/* <Grid container spacing={2} sx={{ marginTop: "30px" }}> */}
          <Box sx={{ padding: "0px 400px" }}>
            <Grid item xs={3}>
              <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ fontWeight: "bold" }}>
                        Máy nướng
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Trạng thái
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Số lượng
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {machine.map((machine) => (
                      <TableRow key={machine.bakingMachineID}>
                        <TableCell align="left">{machine.title}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: machine.status === "Bận" ? "red" : "green",
                            fontWeight: "bold",
                          }}
                        >
                          {machine.status}
                        </TableCell>
                        <TableCell align="center">{machine.quantityCake}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>

          <Box sx={{padding: "50px"}}>
            <Grid item xs={9}>
              <TableContainer component={Paper} sx={{ marginRight: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Tên bánh
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Kích thước
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Nhân
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Số lượng
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Máy
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Trạng thái
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cake.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{"Bánh kem"}</TableCell>
                        <TableCell align="center">{item?.OrderCart?.cakeSize?.title} cm</TableCell>
                        <TableCell align="center">{item?.OrderCart?.cakeFilling?.title}</TableCell>
                        <TableCell align="center">{item?.OrderCart?.quantity * item?.OrderCart?.floor}</TableCell>
                        <TableCell align="center">
                          <Select
                            value={item.machine || ""}
                            onChange={(event) => handleMachineChange(event, item.id)}
                            disabled={machinesInUse.has(item.machine)}
                            sx={{ width: "100%" }}
                          >
                            {machine.map((machine) => (
                              <MenuItem
                                key={machine.bakingMachineID}
                                value={machine.title}
                                disabled={
                                  machine.status === "Bận" && machine.title !== item.machine
                                }
                              >
                                {machine.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="center">{item.bakingStatus}</TableCell>
                        <TableCell align="center">
                          {item.bakingStatus === "Chưa xử lý" ? (
                            <Button
                              variant="contained"
                              onClick={() => handleStartProcessing(item.machine)}
                              sx={{
                                backgroundColor: "#E82552",
                                color: "#FFFFFF",
                                "&:hover": {
                                  backgroundColor: "#C41C47",
                                },
                              }}
                            >
                              Bắt đầu
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => handleOpenConfirmDialog(item.orderCakeDetailID)}
                              sx={{
                                backgroundColor: "#E82552",
                                color: "#FFFFFF",
                                "&:hover": {
                                  backgroundColor: "#C41C47",
                                },
                              }}
                            >
                              Kết thúc
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        {/* </Grid> */}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={() => handleCloseConfirmDialog(false)}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn kết thúc quá trình?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseConfirmDialog(false)}>Hủy</Button>
          <Button onClick={() => handleCloseConfirmDialog(true)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMachineConfirmDialog}
        onClose={() => handleCloseMachineConfirmDialog(false)}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn bắt đầu quá trình?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseMachineConfirmDialog(false)}>
            Hủy
          </Button>
          <Button onClick={() => handleCloseMachineConfirmDialog(true)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openNotEnoughCakeDialog}
        onClose={() => handleCloseNotEnoughCakeDialog(false)}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          Số lượng bánh chưa đủ. Bạn có chắc chắn muốn bắt đầu quá trình không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseNotEnoughCakeDialog(false)}>
            Hủy
          </Button>
          <Button onClick={() => handleCloseNotEnoughCakeDialog(true)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default CakeProcess;
