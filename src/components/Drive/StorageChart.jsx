"use client";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { Box, Button, Card, Typography } from "@mui/material";
import { convertFileSize } from "../Common/helper";

export default function StorageChart({ data }) {
  console.log("data", data);
  return (
    <>
      <Typography variant="bold" size="medium">
        {" "}
      </Typography>
      <Box
        sx={{
          height: "350px",
          mt: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="bold" size={"large"} sx={{ px: 3 }}>
          {" "}
          Storage Usage
        </Typography>
        {typeof window !== "undefined" && (
          <Chart
            height={"290px"}
            options={{
              tooltip: {
                enabled: true,
                enabledOnSeries: true,
                shared: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  return (
                    ["Used", "Free"][seriesIndex] +
                    ":" +
                    convertFileSize(series[seriesIndex])
                  );
                },
                followCursor: false,
                intersect: false,
                inverseOrder: false,
                hideEmptySeries: true,
                fillSeriesColor: false,
                theme: false,
                style: {
                  fontSize: "12px",
                  fontFamily: "Montserrat",
                },
                onDatasetHover: {
                  highlightDataSeries: true,
                },
                x: {
                  show: true,
                  format: "dd MMM",
                  formatter: undefined,
                },

                // y: {
                //   // formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                //   //   return `${w?.config?.series[seriesIndex]?.data[dataPointIndex]?.x}  `;
                //   // },

                title: {
                  formatter: (seriesName) => seriesName,
                },
                // },
                z: {
                  formatter: undefined,
                  title: "Size: ",
                },

                marker: {
                  show: true,
                },
                items: {
                  display: "flex",
                },
                fixed: {
                  enabled: false,
                  position: "topRight",
                  offsetX: 0,
                  offsetY: 0,
                },
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      fontFamily: "Montserrat",
                      name: {
                        show: true,
                        formatter: () => "Total Size",
                        color: "red",
                      },
                      // total:"AAAA",
                      // value:444
                      total: {
                        show: true,
                        formatter: () => convertFileSize(data?.totalSpace),
                        // label:"shshs",
                        showAlways: true,
                      },
                    },
                    // size:"",
                    background: "#FFF",
                  },
                },
              },

              // options: {
              //   chart: {
              //     type: "donut",
              //     height: 50,
              //   },
              //   responsive: [
              //     {
              //       breakpoint: 480,
              //       options: {
              //         chart: {
              //           width: 200,
              //         },
              //         legend: {
              //           position: "bottom",
              //         },
              //       },
              //     },
              //   ],
              // },
              colors: ["#4a72ff", "#2fa534"],
              labels: ["Used", "Free"],
              dataLabels: {
                enabled: true,
                // distributed: true,
                // textAnchor: "start",
                // style: {
                //   colors: ["#fff"],
                // },

                // formatter: function (val, opt) {
                //   return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
                // },
                // offsetX: 0,
                // dropShadow: {
                //   enabled: true,
                // },
              },
              legend: {
                formatter: function (seriesName, opts) {
                  console.log("opts", opts.w.globals.series);
                  let dd = opts.w.globals.series;
                  console.log("dd", dd[0]);
                  return (
                    seriesName + " - " + convertFileSize(dd[opts?.seriesIndex])
                  );
                },
                labels: {},
              },
            }}
            series={[data?.usedSpace, data?.freeSpace]}
            // series={chartData.series}
            type={"donut"}
            // theme={theme.mode}
          />
        )}
        <Button
        //   variant="text"
        //   onFocus={() => setDisabled(true)}
        //   onBlur={() => setDisabled(false)}
        //   onClick={(e) => {
        //     e.stopPropagation();
        //   }}
        >
          {" "}
        </Button>
      </Box>
    </>
  );
}
