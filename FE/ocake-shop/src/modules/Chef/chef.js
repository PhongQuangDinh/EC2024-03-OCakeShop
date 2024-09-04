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
  const [cakeCook, setCakeCook] = useState([]);

  // useEffect(() => {
  //   const fetchCakeRecipe = async () => {
  //     try {
  //       const data = await fetchWithAuth(router, "/recipe");
  //       setData(data || "");
  //       console.log(data);
  //     } catch (err) {
  //       setError("SOS " + err.message);
  //     }
  //   };

  //   fetchCakeRecipe();
  // }, []);

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

  // useEffect(() => {
  //   const fetchCake = async () => {
  //     try {
  //       const data = await fetchWithAuth(router, "/recipe/cake");
  //       if (!data) {
  //         console.log("Don't have cake");
  //         return;
  //       }
        
  //       // Add a 'machine' property to each cake item
  //       const updatedData = data.map(cakeItem => ({
  //         ...cakeItem,
  //         machine: '' // You can initialize this with an empty string or a default value
  //       }));
  
  //       console.log(updatedData);
  //       setCake(updatedData || []);
  //     } catch (error) {
  //       setError(error.message);
  //       console.log(error + " SOSSSSSS");
  //     }
  //   };
  
  //   fetchCake();
  // }, []);

  useEffect(() => {
    const fetchMachine = async () => {
      try{
        const data = await fetchWithAuth(router, "/recipe/machine");
        if(!data){
          console.log("Dont have machine");
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
  
    if (selectedMachine == "Chưa xử lý") {
      // Handle logic for "Chưa xử lý" if needed
      const newData = cake.map((item) =>
        item.orderCakeDetailID === id ? { ...item, bakingMachineID: "" } : item
      );
      setCake(newData);
      return;
    }
  
    // Check if the selected machine is in use by another item
    const isMachineInUse = cake.some(
      (item) => item.machine === selectedMachine && item.status === "Đang xử lý"
    );
  
    if (isMachineInUse) {
      setSnackbarMessage(
        `Máy ${selectedMachine} đang được sử dụng. Vui lòng chọn máy khác.`
      );
      setOpenSnackbar(true);
      return;
    }
  
    // Update the selected machine for the specific item
    const newData = cake.map((item) =>
      item.orderCakeDetailID === id ? { ...item, bakingMachineID: selectedMachine } : item
    );
    setCake(newData);
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

  const handleStartProcessing = (bakingMachineID) => {
    console.log("Machine " + bakingMachineID);
    const itemsToStart = cake.filter(
      (item) => item.bakingMachineID === bakingMachineID && item.bakingStatus === "Chưa xử lý"
    );

    const machineData = machine.find((m) => m.bakingMachineID === bakingMachineID);
    // console.log("Machine Data Found:", machineData);

    if (!bakingMachineID) {
      setSnackbarMessage("Bạn phải chọn máy trước khi bắt đầu.");
      setOpenSnackbar(true);
      return;
    }

    if (!machineData) {
      setSnackbarMessage(`Máy ${machineData.title} không tồn tại.`);
      setOpenSnackbar(true);
      return;
    }

    const totalQuantity = itemsToStart.reduce((sum, item) => sum + (item?.OrderCart?.quantity * item?.OrderCart?.floor), 0);

    console.log(`${totalQuantity}`);

    if (totalQuantity < machineData.quantityCake) {
      setMachineToStart(bakingMachineID);
      setOpenNotEnoughCakeDialog(true);
    } else if (totalQuantity > machineData.quantityCake) {
      setSnackbarMessage(`${machineData.title} không đủ chỗ cho ${totalQuantity} bánh. Vui lòng bỏ bớt bánh.`);
      setOpenSnackbar(true);
    } else {
      setMachineToStart(bakingMachineID);
      setOpenMachineConfirmDialog(true);
    }
  };

  const handleOpenConfirmDialog = (id) => {
    setCurrentItemId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = (confirm) => {
    if (confirm && currentItemId !== null) {
      const currentItem = cake.find((item) => item.orderCakeDetailID === currentItemId);
      
      if (currentItem) {
        // Lấy ID máy nướng của bánh hiện tại
        const machineId = currentItem.bakingMachineID;
  
        // Cập nhật trạng thái của các bánh cùng máy
        const newDataCake = cake.map((item) =>
          item.bakingMachineID === machineId && item.bakingStatus === "Đang xử lý"
            ? { ...item, bakingStatus: "Đã xử lý" }
            : item
        );
        console.log(newDataCake);
        completeCookCake(newDataCake);
        setCake(newDataCake);  
  
        const newDataMachine = machine.map((m) =>
          m.bakingMachineID === machineId
            ? { ...m, status: "Rảnh" }
            : m
        );
        notActiveMachine(newDataMachine);
        setMachine(newDataMachine);
      }
    }
    setOpenConfirmDialog(false);
  };
  
  const activeMachine = async (machine) => {
    try{
      const data = await fetchWithAuth(router, "/recipe/machine/active",{
        method: "POST",
        body: JSON.stringify(machine),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!data){
        console.log("Dont update machine");
        return;
      }
      console.log(data);
      // setMachine(data || "");
    }
    catch(error){
      setError(error.message);
      console.log(error+ " SOSSSSSS");
    }
  };

  const activeCake = async (cakes) => {
    try{
      const data = await fetchWithAuth(router, "/recipe/cake/active",{
        method: "POST",
        body: JSON.stringify(cakes),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!data){
        console.log("Dont update cake");
        return;
      }
      console.log(data);
      // setMachine(data || "");
    }
    catch(error){
      setError(error.message);
      console.log(error+ " SOSSSSSS");
    }
  };

  const completeCookCake = async (cakes) => {
    try{
      const data = await fetchWithAuth(router, "/recipe/cake/complete",{
        method: "POST",
        body: JSON.stringify(cakes),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!data){
        console.log("Dont update cake");
        return;
      }
      console.log(data);
      // setMachine(data || "");
    }
    catch(error){
      setError(error.message);
      console.log(error+ " SOSSSSSS");
    }
  };


  const notActiveMachine = async (machine) => {
    try{
      const data = await fetchWithAuth(router, "/recipe/machine/not-active",{
        method: "POST",
        body: JSON.stringify(machine),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!data){
        console.log("Dont update machine");
        return;
      }
      console.log(data);
      // setMachine(data || "");
    }
    catch(error){
      setError(error.message);
      console.log(error+ " SOSSSSSS");
    }
  };

  const handleCloseMachineConfirmDialog = (confirm) => {
    // console.log("handleCloseMachineConfirmDialog");
    const previousCakeData = [...cake];
    if (confirm && machineToStart) {
      // let bakingMachineID;
      // console.log("handleCloseMachineConfirmDialog START");
      const newData = cake.map((item) =>
        item.bakingMachineID === machineToStart && item.bakingStatus === "Chưa xử lý"
          ? { ...item, bakingStatus: "Đang xử lý" }
          : item
      );
      console.log(newData);
      setCake(newData);
      activeCake(newData);
      console.log(newData);
      const newDataMachine = machine.map((item) =>
        item.bakingMachineID === machineToStart && item.status === "Rảnh"
          ? { ...item, status: "Bận" }
          : item
      );
      setMachine(newDataMachine);
      activeMachine(newDataMachine);
      const changedCakes = newData.filter((item, index) => 
        item.bakingStatus !== previousCakeData[index].bakingStatus
      );
      // console.log(changedCakes);
      setCakeCook(changedCakes);
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
                        Số thứ tự
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
                    {cake.map((item, index) => (
                      <TableRow key={item?.orderCakeDetailID}>
                        <TableCell align="center">{index+1}</TableCell>
                        <TableCell align="center">{item?.OrderCart?.cakeSize?.title} cm</TableCell>
                        <TableCell align="center">{item?.OrderCart?.cakeFilling?.title}</TableCell>
                        <TableCell align="center">{item?.OrderCart?.quantity * item?.OrderCart?.floor}</TableCell>
                        <TableCell align="center">
                        <Select
                          value={item.bakingMachineID || "Chưa xử lý"} // Ensure default value is empty string
                          onChange={(event) => handleMachineChange(event, item.orderCakeDetailID)}
                          disabled={machinesInUse.has(item.machine)}
                          sx={{ width: "100%" }}
                        >
                          <MenuItem value="">Chưa xử lý</MenuItem>
                          {machine.map((m) => (
                            <MenuItem
                              key={m.bakingMachineID}
                              value={m.bakingMachineID}
                              disabled={
                                m.status === "Bận" && m.bakingMachineID !== item.bakingMachineID
                              }
                            >
                              {m.title}
                            </MenuItem>
                          ))}
                        </Select>

                        </TableCell>
                        <TableCell align="center">{item.bakingStatus}</TableCell>
                        <TableCell align="center">
                          {item.bakingStatus === "Chưa xử lý" ? (
                            <Button
                              variant="contained"
                              onClick={() => handleStartProcessing(item.bakingMachineID)}
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
