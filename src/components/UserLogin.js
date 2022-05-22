import { Box, Button, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "./../axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UserLogin = (props) => {
  const [val, setVal] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async () => {
    const resp = await axios.post("/user/login", val, {});
    console.log(resp);

    if (resp.status === 200) {
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
        style={{ width: "100%", marginTop: "20px" }}
        onClick={submitHandler}
      >
        LogIn
      </Button>
    </form>
  );
};

export default UserLogin;
