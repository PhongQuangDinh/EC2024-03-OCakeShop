import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import dayjs from "dayjs";

const statusMap = {
  "Chưa xử lý": { label: "Chưa xử lý", color: "warning" },
  "Đã xử lý": { label: "Đã xử lý", color: "success" },
};

export function LatestOrders({ orders = [], sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title="Đơn hàng gần đây" />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, 6).map((order) => {
              const { label, color } = statusMap[order.handleStatus] ?? {
                label: "Unknown",
                color: "default",
              };

              return (
                <TableRow hover key={order.orderCakeID}>
                  <TableCell>{order.orderCakeID}</TableCell>
                  <TableCell>{order.OrderCart.customer.name}</TableCell>
                  <TableCell>
                    {new Date(order.OrderDetails.orderTime).toLocaleDateString(
                      "vi-VN"
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
