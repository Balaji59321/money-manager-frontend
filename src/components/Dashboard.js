import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardWidget from "./CardWidget";
import DonutChart from "react-donut-chart";
import { Doughnut } from "react-chartjs-2";
import axios from "./../axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const chartColors = [
  "#336699",
  "#99CCFF",
  "#999933",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775",
];

export const options = {
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        callback: () => "",
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        callback: () => "",
      },
    },
  },
};

const Dashboard = () => {
  const [expense, setExpense] = useState({
    income: 0,
    expenditure: 0,
  });
  const [expenseFor, setExpenseFor] = useState({
    personal: 0,
    office: 0,
  });

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["Expenditure", "Income"],
    datasets: [
      {
        data: [expense.expenditure, expense.income],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };

  const [month, setMonth] = useState({
    0: [{ income: 0, expense: 0 }],
    1: [{ income: 0, expense: 0 }],
    2: [{ income: 0, expense: 0 }],
    3: [{ income: 0, expense: 0 }],
    4: [{ income: 0, expense: 0 }],
    5: [{ income: 0, expense: 0 }],
    6: [{ income: 0, expense: 0 }],
    7: [{ income: 0, expense: 0 }],
    8: [{ income: 0, expense: 0 }],
    9: [{ income: 0, expense: 0 }],
    10: [{ income: 0, expense: 0 }],
    11: [{ income: 0, expense: 0 }],
  });

  const groupData = (exp) => {
    exp.length > 0 &&
      exp.map((ele) => {
        ele.type === "Income"
          ? setExpense((prev) => {
              return { ...prev, income: +(+prev.income + +ele.amount) };
            })
          : setExpense((prev) => {
              return {
                ...prev,
                expenditure: +(+prev.expenditure + +ele.amount),
              };
            });
      });
    exp.length > 0 &&
      exp.map((ele) => {
        ele.expenseFor === "Personal"
          ? setExpenseFor((prev) => {
              return { ...prev, personal: +(+prev.personal + 1) };
            })
          : setExpenseFor((prev) => {
              return {
                ...prev,
                office: +(+prev.office + 1),
              };
            });
      });
  };

  const groupDataByMonth = (exp) => {
    exp.length > 0 &&
      exp.map((ele) => {
        var curr_month = new Date(Date.parse(ele.createdAt)).getMonth();
        if (ele.type === "Income") {
          setMonth((prev) => {
            return {
              ...prev,
              [curr_month]: [
                {
                  income: +prev[curr_month][0]["income"] + +ele.amount,
                  expense: +prev[curr_month][0]["expense"],
                },
              ],
            };
          });
        } else {
          setMonth((prev) => {
            return {
              ...prev,
              [curr_month]: [
                {
                  income: +prev[curr_month][0]["income"],
                  expense: +prev[curr_month][0]["expense"] + +ele.amount,
                },
              ],
            };
          });
        }
      });
  };

  const groupTotal = (data) => {
    data.length > 0 &&
      data.map((ele) =>
        ele.type === "Income"
          ? setTotalIncome((prev) => prev + +ele.amount)
          : setTotalExpense((prev) => prev + +ele.amount)
      );
  };

  useEffect(() => {
    const getexpense = async () => {
      const resp = await axios.get("/expense/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      groupData(resp.data);
      groupDataByMonth(resp.data);
      groupTotal(resp.data);
    };
    getexpense();
  }, []);
  return (
    <Box bgcolor={"#ddd"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
        py={3}
      >
        <CardWidget title="Your Balance" amount={totalIncome - totalExpense} />
        <CardWidget title="Your Income" amount={totalIncome} />
        <CardWidget title="Your Expenses" amount={totalExpense} />
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}
        mt={2}
      >
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          px={3}
        >
          <Typography variant="h6">Income vs Expenses (In Rupees)</Typography>
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          px={3}
        >
          <Typography variant="h6">Office vs Personal (Count)</Typography>
          <Doughnut
            data={{
              maintainAspectRatio: false,
              responsive: false,
              labels: ["Office", "Personal"],
              datasets: [
                {
                  data: [expenseFor.office, expenseFor.personal],
                  backgroundColor: chartColors,
                  hoverBackgroundColor: chartColors,
                },
              ],
            }}
            options={options}
          />
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
          height: "60%",
        }}
        mt={2}
      >
        <Typography variant="h6">Expense based on Month</Typography>
        <Bar
          options={{}}
          data={{
            labels,
            datasets: [
              {
                label: "Income",
                data: labels.map((ele, ind) => month[ind][0]["income"]),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Expense",
                data: labels.map((ele, ind) => month[ind][0]["expense"]),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
          style={{ display: "flex", padding: "5px 30px" }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
