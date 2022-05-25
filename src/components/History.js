import React, { useEffect, useState } from "react";
import axios from "./../axios";
import { Box, Card, Typography } from "@mui/material";
import "./History.css";
import moment from "moment";
// import DateTimePicker from "react-datetime-picker";

const History = () => {
  const [record, setRecord] = useState([]);

  // const [fromValue, fromChange] = useState(new Date());
  // const [toValue, toChange] = useState(new Date());

  useEffect(() => {
    const transaction = async () => {
      const resp = await axios.get("expense/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setRecord(resp.data);
      // let temp = resp.data.map((ele) => ele["createdAt"]);
      // let createdDate = moment(temp[0]).format("MMMM Do YYYY, h:mm:ss a");

      // console.log(
      //   moment(new Date(temp[0]).toISOString()).diff(
      //     new Date().toISOString(),
      //     "seconds"
      //   )
      // );
      // console.log(
      //   moment(moment(fromValue).format("MMMM Do YYYY, h:mm:ss a")).toutc()
      // );
      // console.log(resp.data);
    };
    transaction();
  }, []);

  // console.log(fromValue, toValue);
  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Expense Transactions
      </Typography>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>From Date</Typography>
          <DateTimePicker onChange={fromChange} value={fromValue} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>To Date</Typography>
          <DateTimePicker onChange={toChange} value={toValue} />
        </Box>
      </Box> */}
      <Box sx={{ overFlow: "scroll" }}>
        {record.message && (
          <p style={{ textAlign: "center" }}>No Record Found</p>
        )}
        <Box
          sx={{
            width: "90%",
            margin: "20px auto",
            padding: "10px",
            display: "flex",
            justifyContent: "space-around",
            textAlign: "left",
            backgroundColor: "#",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            borderRadius: "3px",
          }}
        >
          <Typography>Title</Typography>
          <Typography>Amount</Typography>
          <Typography>Type</Typography>
          <Typography>DateTime</Typography>
          <Typography>For</Typography>
          <Typography>Category</Typography>
        </Box>
        {record.length > 0 &&
          record.map((ele) => (
            <Card
              sx={{
                width: "90%",
                margin: "20px auto",
                padding: "10px",
                display: "flex",
                justifyContent: "space-around",
                textAlign: "left",
                backgroundColor: "#eee",
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
              className={`${ele.type === "Expenditure" ? "red" : "green"}`}
            >
              {console.log(ele)}
              <Box sx={{ display: "flex" }}>
                <Typography>{ele.title}</Typography>
              </Box>

              <Typography>
                {ele.type === "Expenditure"
                  ? -ele.amount
                  : "+".concat(+ele.amount)}
              </Typography>
              <Typography>{ele.type}</Typography>
              <Typography>
                {moment(ele.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </Typography>
              <Typography>{ele.expenseFor}</Typography>
              <Typography>{ele.categoryId["name"]}</Typography>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default History;
