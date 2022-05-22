import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { bgcolor, Box } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "./../axios";

const AddExpense = () => {
  const [transaction, setTransaction] = useState([]);
  const [categories, setCategories] = useState([]);
  const [val, setVal] = useState({
    title: "",
    amount: 0,
    type: "Income",
    expenseFor: "Personal",
    createdAt: "",
    categoryId: "",
    _id: "",
  });

  console.log(val);

  useEffect(() => {
    const test = async () => {
      const resp = await axios.get("/category/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      await setCategories(resp.data);
    };
    test();
  }, []);

  useEffect(() => {
    const getexpense = async () => {
      const resp = await axios.get("/expense/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setTransaction(resp.data);
    };
    getexpense();
  }, [val]);

  const changeHandler = (e) => {
    setVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const deleteExpense = async (e, elem) => {
    const resp = await axios.delete("/expense/delete", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { expenseId: elem._id },
    });
    console.log(resp.data);
    setVal({
      title: "",
      amount: 0,
      type: "Income",
      expenseFor: "Personal",
      createdAt: "",
      categoryId: "",
      _id: "",
    });
  };

  const submitHandler = async () => {
    if (val.createdAt) {
      console.log(val);
      const resp = await axios.put("/expense/update", val, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(resp.data);
    } else {
      const resp = await axios.post(
        "/expense/create",
        {
          title: val.title,
          amount: val.amount,
          type: val.type,
          expenseFor: val.expenseFor,
          createdAt: val.createdAt,
          categoryId: val.categoryId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resp.data);
    }
    setVal({
      title: "",
      amount: 0,
      type: "Income",
      expenseFor: "Personal",
      createdAt: "",
      categoryId: "",
      _id: "",
    });
  };

  const editExpense = (e, ele) => {
    // {title: 'frefer', amount: '10', type: 'Income', expenseFor: 'Personal', createdAt: '5/21/2022, 4:22:56 PM'}
    setVal({
      title: ele.title,
      amount: ele.amount,
      type: ele.type,
      expenseFor: ele.expenseFor,
      createdAt: ele.createdAt,
      categoryId: "",
      _id: ele._id,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "column", lg: "row" },
      }}
      p={4}
    >
      <form
        style={{
          width: { xs: "90%", sm: "80%", md: "60", lg: "30%" },
          padding: "30px",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", borderRadius: "5pxx" }}
          bgcolor="#ddd"
          p={2}
        >
          + Add Transaction
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
          <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
            Title
          </InputLabel>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            value={val.title}
            onChange={changeHandler}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
          <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
            Amount
          </InputLabel>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            name="amount"
            value={val.amount}
            onChange={changeHandler}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
          <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
            Type
          </InputLabel>
          <Select value={val.type} name="type" onChange={changeHandler}>
            <MenuItem value={"Expenditure"}>Expenditure</MenuItem>
            <MenuItem value={"Income"}>Income</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
          <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
            Expense For
          </InputLabel>
          <Select
            value={val.expenseFor}
            name="expenseFor"
            onChange={changeHandler}
          >
            <MenuItem value={"Personal"}>Personal</MenuItem>
            <MenuItem value={"Office"}>Office</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
          <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
            Category
          </InputLabel>
          <Select
            value={categories.map((ele) => ele.name)[0]}
            name="categoryId"
            onChange={changeHandler}
          >
            {categories.map((ele) => (
              <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          variant="contained"
          style={{ marginTop: "25px", width: "100%" }}
          onClick={() => submitHandler()}
        >
          Submit
        </Button>
      </form>
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid #111",
          overflow: "auto",
          height: "80vh",
          borderRadius: "5px",
        }}
        bgcolor="#eee"
      >
        <Typography
          variant="h6"
          my={1}
          sx={{ display: "block", textAlign: "center", fontWeight: 900 }}
        >
          User History
        </Typography>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "repeat(6,1fr)",
            backgroundColor: "#ddd",
            borderTop: "1px solid #333",
            borderBottom: "1px solid #333",
            fontWeight: "800",
            color: "#333",
          }}
          py={1}
        >
          <Typography variant="p">Title</Typography>
          <Typography variant="p">Amount</Typography>
          <Typography variant="p">Type</Typography>
          <Typography variant="p">For</Typography>
          <Typography variant="p">CreatedAt</Typography>
          <Typography variant="p">Action</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {transaction.length > 0 &&
            transaction?.map((ele) => (
              <Box
                variant="p"
                sx={{
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "repeat(6,1fr)",
                  overflow: "scroll",
                }}
                key={Math.random()}
              >
                <Typography>{ele.title}</Typography>
                <Typography>{ele.amount}</Typography>
                <Typography>{ele.type}</Typography>
                <Typography>{ele.expenseFor}</Typography>
                <Typography sx={{ fontSize: 15 }}>{ele.createdAt}</Typography>
                <Box>
                  <IconButton>
                    <EditIcon onClick={(e) => editExpense(e, ele)} />
                  </IconButton>
                  <IconButton onClick={(e) => deleteExpense(e, ele)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddExpense;
