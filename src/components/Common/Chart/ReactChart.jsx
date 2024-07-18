import { Box, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ReactChart = ({
  showToolbar,
  data,
  type,
  axisBorder,
  grid,
  roundOff,
  colors = ["#0038FF", "#4A72FF", "#809CFF", "#ABBEFF"],
  distributed = false,
  dataLabel,
  title,
  legend = true,
  xAxisType,
  categories = [],
  yAxisTitle,
  height,
  fillType = "normal",
  legendPosition = "bottom",
  dataLabelsColor = ["#00e396", "#ff3154", "#fadd17"],
  labels = [],
  curve = "smooth",
  LabelFormatter,
  dashArray = [0, 8],
  centerLabel = "Total",
  centerNum = null,
  showDefaultLabels = true,
  stacked = false,
  horizontal = false,
  opposite = false,
  legendMargin = 5,
  dataLabelFormat = null,
}) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    series: data,
    options: {},
  });

  useEffect(() => {
    updateChartData();
  }, [data, theme]);

  const updateChartData = () => {
    const newChartData = {
      ...chartData,
      series: data,
      options: {
        labels: labels,
        theme: {
          mode: theme?.mode,
          monochrome: {
            enabled: theme?.mode === "dark",
            color: "#255aee",
            shadeTo: "dark",
            shadeIntensity: 0.65,
          },
        },
        chart: {
          stacked: stacked,

          horizontal: horizontal,
          stackType: "100%",
          zoom: {
            enabled: showToolbar,
          },
          toolbar: {
            show: showToolbar,
          },
        },
        colors: colors,
        fill: {
          type: fillType,
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "lighten",
              value: 0.15,
            },
            width: 400,
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "darken",
              value: 0.35,
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top",
            },
            columnWidth: "50%",
            horizontal: horizontal,
            distributed: distributed,
          },
          pie: {
            donut: {
              labels: {
                show: true,
                fontFamily: "Montserrat",
                value: {},
                total: {
                  fontFamily: "Montserrat",
                  show: true,
                  label: centerLabel,
                  formatter: function (w) {
                    let total = w.globals.seriesTotals.reduce(
                      (a, b) => a + b,
                      0
                    );
                    let val;
                    if (centerNum !== null && centerNum !== undefined) {
                      val = Math.floor(centerNum);
                    } else {
                      val = total;
                    }
                    return new Intl.NumberFormat("en-US").format(val);
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: dataLabel,
          offsetY: type === "bar" ? -20 : 0,
          style: {
            colors: dataLabelsColor,
          },
          formatter: function (val) {
            if (roundOff) val = Math.floor(val);
            else val = Math.abs(val).toFixed(2);
            return new Intl.NumberFormat("en-US").format(val);
          },
        },
        stroke: {
          curve: curve,
          width: 3,
          dashArray: dashArray,
        },
        title: {
          text: title,
          align: "center",
          style: {
            color: "#999",
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        legend: {
          show: legend,
          position: legendPosition,
          horizontalAlign: "center",
          floating: false,
          fontSize: "12px",
          fontFamily: "Montserrat",
          fontWeight: 400,
          formatter:
            typeof LabelFormatter === "function"
              ? (seriesName, opts) =>
                  LabelFormatter(seriesName, opts, dashArray)
              : undefined,
          inverseOrder: false,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 20,
            height: showDefaultLabels ? 20 : 0,
            strokeWidth: 0,
            strokeColor: "#fff",
            radius: 2,
          },
          itemMargin: {
            horizontal: legendMargin,
            vertical: 15,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        xaxis: {
          type: xAxisType,
          tickPlacement: "on",
          lines: {
            show: true,
          },
          labels: {
            hideOverlappingLabels: false,
            style: {
              colors: "#999",
            },
          },
          categories: categories,
        },
        yaxis: {
          opposite: opposite,
          lines: {
            show: true,
          },
          min: 0,
          forceNiceScale: true,
          labels: {
            style: {
              colors: "#999",
            },
            formatter: function (val) {
              if (roundOff) val = Math.floor(val);
              else val = Math.abs(val).toFixed(2);
              return new Intl.NumberFormat("en-US").format(val);
            },
          },
          axisBorder: {
            show: axisBorder,
            color: "#78909C",
          },
          title: {
            text: yAxisTitle,
            rotate: -90,
            style: {
              color: "#939394",
            },
          },
        },
        grid: {
          show: grid,
          borderColor: "#CFCFCF",
          strokeDashArray: 2,
          position: "back",
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            opacity: 0.5,
          },
          column: {
            opacity: 0.5,
          },
        },
        noData: {
          text: "No Data Available",
          align: "center",
          verticalAlign: "middle",
          style: {
            fontSize: "14px",
            fontFamily: "Montserrat",
          },
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: true,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: dataLabelFormat ? (e) => dataLabelFormat(e) : undefined,
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

          //   title: {
          //     formatter: (seriesName) => seriesName,
          //   },
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
      },
    };
    setChartData(newChartData);
  };

  return (
    <Box className="react-chart">
      <Chart
        height={height ?? 400}
        options={chartData.options}
        series={chartData.series}
        type={type}
        theme={theme.mode}
      />
    </Box>
  );
};

export default ReactChart;
