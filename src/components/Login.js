import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import image from "./../background.png";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";

const Login = (props) => {
  const [value, setValue] = React.useState("login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url(${image})`,
        display: "grid",
        // height: "100vh",
        // width: "100vw",
        // position: "absolute",
        // zIndex: -999,
        // top: 0,
        // left: 0,
        placeItems: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // overflow: "hidden",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="login" label="Login" />
        <Tab value="signup" label="Sign-Up" />
      </Tabs>
      {value === "login" && <UserLogin login={props.login} />}
      {value === "signup" && <UserSignup login={props.login} />}
    </Box>
  );
};

export default Login;
