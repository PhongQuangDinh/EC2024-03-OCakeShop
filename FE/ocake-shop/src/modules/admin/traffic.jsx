"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { Chart } from "./chart";
import { Desktop, DeviceTablet, Phone } from "@phosphor-icons/react";

const iconMapping = {
  Desktop: Desktop,
  Tablet: DeviceTablet,
  Phone: Phone,
};

export function Traffic({ sx }) {
  const [chartSeries, setChartSeries] = useState([15, 2, 6]);
  const [labels] = useState(["Desktop", "Tablet", "Phone"]);

  const chartOptions = useChartOptions(labels);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    let updatedSeries = [...chartSeries];

    if (/mobile/i.test(userAgent)) {
      updatedSeries[2] += 1; // Phone
    } else if (/tablet|ipad|android(?!.*mobile)/i.test(userAgent)) {
      updatedSeries[1] += 1; // Tablet
    } else {
      updatedSeries[0] += 1; // Desktop
    }

    setChartSeries(updatedSeries);
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Lượt truy cập" />
      <CardContent>
        <Stack spacing={2}>
          <Chart
            height={300}
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width="100%"
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: "center" }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item} lượt truy cập
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels) {
  const theme = useTheme();

  return {
    chart: { background: "transparent" },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
