import { Button, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "./../axios";
import { useNavigate } from "react-router-dom";

const UserSignup = (props) => {
  const navigate = useNavigate();

  const [val, setVal] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async () => {
    const resp = await axios.post("/user/signup", val);
    if (resp.status === 201) {
      await window.localStorage.setItem("token", resp.data.token);
      props.login();
      navigate("/dashboard");
    } else {
      alert("Please Login with correct username and password");
    }
  };

  return (
    <form style={{ width: "30%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
        <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
          Enter the User Name
        </InputLabel>
        <TextField
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          name="username"
          value={val.username}
          onChange={changeHandler}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
        <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
          Enter the Email
        </InputLabel>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={val.email}
          onChange={changeHandler}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
        <InputLabel htmlFor="my-input" sx={{ marginBottom: "10px" }}>
          Enter the Password
        </InputLabel>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          value={val.password}
          onChange={changeHandler}
        />
      </Box>
      <Button
        variant="contained"
        style={{ width: "100%", marginTop: "15px" }}
        onClick={submitHandler}
      >
        Sign-Up
      </Button>
    </form>
  );
};

export default UserSignup;
