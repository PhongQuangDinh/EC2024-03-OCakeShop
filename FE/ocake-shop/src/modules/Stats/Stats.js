"use client";
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CountUp from "react-countup";
import Layout from "../layout";

const StatisticsCard = ({ title, value }) => (
  <Card>
    <Box sx={{ padding: "0 2rem" }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "4rem" }}>
          <Typography variant="h5" component="div">
            <CountUp end={value} duration={2} />
          </Typography>
          <Button>Chi tiết</Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

const StatisticsPage = () => {
  const stats = [
    { title: "Chi phí", value: 3000000 },
    { title: "Doanh số", value: 40 },
    { title: "Doanh thu", value: 4000000 },
    { title: "Lợi nhuận", value: 1000000 },
  ];

  return (
    <Layout>
      <Box
        sx={{
          background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
          height: "100vh",
          padding: "7% 10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} key={index}>
              <StatisticsCard title={stat.title} value={stat.value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default StatisticsPage;
