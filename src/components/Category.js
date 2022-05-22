import {
  Box,
  Button,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "./../axios";

const Category = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [cat, setCat] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const test = async () => {
      const resp = await axios.get("/category/get", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      await setCategory(resp.data);
    };
    test();
  }, [cat, loading]);

  const submitHandler = async () => {
    await axios.post(
      "/category/create",
      {
        name: cat,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCat("");
  };

  const editHandler = async (ele) => {
    await setShowCategory(true);
    setCat(ele.name);
    // setCategory(category.filter((el) => el !== ele));
  };

  const deleteHandler = async (ele) => {
    setLoading(true);
    await axios.delete("/category/remove", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        id: ele._id,
      },
    });
    setLoading(false);
  };

  return (
    <Box my={2} textAlign="center">
      <Button
        variant="contained"
        onClick={() => setShowCategory((prev) => !prev)}
      >
        Add a Category
      </Button>
      {showCategory && (
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            name="title"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "20px" }}
            onClick={submitHandler}
          >
            + Add
          </Button>
        </form>
      )}
      <Typography style={{ padding: "20px 0" }}>Category List</Typography>
      <Box>
        {category.length > 0 &&
          category.map((ele) => (
            <Card
              sx={{
                width: { xs: "90%", sm: "80%", md: "60", lg: "40%" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 7px",
                margin: "15px auto",
                backgroundColor: "#ddd",
              }}
            >
              <Typography style={{ textTransform: "capitalize" }}>
                {ele.name}
              </Typography>
              <Box>
                <IconButton onClick={() => editHandler(ele)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteHandler(ele)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Category;
