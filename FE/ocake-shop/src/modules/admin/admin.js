"use client";
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";

import { Budget } from "../../modules/admin/budget";
import { TotalCustomers } from "../../modules/admin/total-customers";
import { TotalProfit } from "../../modules/admin/total-profit";
import { Sales } from "../../modules/admin/sales";
import { Traffic } from "../../modules/admin/traffic";
import { LatestProducts } from "../../modules/admin/latest-products";
import { LatestOrders } from "../../modules/admin/latest-orders";
import Layout from "../../modules/layout";
import { Box } from "@mui/material";
import { fetchWithAuth } from "../../../WebConfig";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [error, setError] = React.useState(null);
  const [CakeData, setCakeData] = React.useState([]);
  const [OrderData, setOrderData] = React.useState([]);
  const [UserData, setUserData] = React.useState([]);
  const [PaymentData, setPaymentData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchCake = async () => {
      try {
        const data = await fetchWithAuth(router, "/cake");
        setCakeData(data || "");
      } catch (err) {
        setError("SOS " + err.message);
      }
    };

    fetchCake();
  }, []);

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await fetchWithAuth(router, "/ordercake/manage");
        setOrderData(data || "");
      } catch (err) {
        setError("SOS " + err.message);
      }
    };

    fetchOrder();
  }, []);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchWithAuth(router, "/user");
        setUserData(data.length || "");
      } catch (err) {
        setError("SOS " + err.message);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await fetchWithAuth(router, "/payment");
        setPaymentData(data.reduce((sum, item) => sum + item.amount, 0) || "");
      } catch (err) {
        setError("SOS " + err.message);
      }
    };

    fetchPayment();
  }, []);

  console.log(PaymentData);

  return (
    <Layout>
      <Box sx={{ margin: "5%" }}>
        <Grid container spacing={3}>
          <Grid lg={4} sm={6} xs={12}>
            <Budget sx={{ height: "100%" }} value={`${PaymentData} VND`} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <TotalCustomers sx={{ height: "100%" }} value={UserData} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <TotalProfit
              sx={{ height: "100%" }}
              value={`${Math.floor(PaymentData * 0.4)} VND`}
            />
          </Grid>
          <Grid lg={8} xs={12}>
            <Sales
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: "Last year",
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <Traffic
              chartSeries={[63, 15, 22]}
              labels={["Desktop", "Tablet", "Phone"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <LatestProducts products={CakeData} sx={{ height: "100%" }} />
          </Grid>
          <Grid lg={8} md={12} xs={12}>
            <LatestOrders orders={OrderData} sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
