import React, { useEffect, useState } from "react";
import axios from "./../axios";
import { Box, Card, Typography } from "@mui/material";
import "./History.css";

const History = () => {
  const [record, setRecord] = useState([]);

  console.log(record);

  useEffect(() => {
    const transaction = async () => {
      const resp = await axios.get("expense/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setRecord(resp.data);
      console.log(resp.data);
    };
    transaction();
  }, []);
  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Expense Transactions
      </Typography>
      <Box sx={{ overFlow: "scroll" }}>
        {record.message && (
          <p style={{ textAlign: "center" }}>No Record Found</p>
        )}
        {record.length > 0 &&
          record.map((ele) => (
            <Card
              sx={{
                width: "70%",
                margin: "20px auto",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "left",
                backgroundColor: "#eee",
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
              className={`${ele.type === "Expenditure" ? "red" : "green"}`}
            >
              <Box sx={{ display: "flex" }}>
                <Typography>{ele.title}</Typography>
              </Box>

              <Typography>
                {ele.type === "Expenditure"
                  ? -ele.amount
                  : "+".concat(+ele.amount)}
              </Typography>
              <Typography>{ele.type}</Typography>
              <Typography>{ele.createdAt}</Typography>
              <Typography>{ele.expenseFor}</Typography>
              <Typography>{ele.category}</Typography>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default History;
