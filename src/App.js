import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardWidget from "./components/CardWidget";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddExpense from "./components/AddExpense";
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import Category from "./components/Category";
import History from "./components/History";
import ResponsiveAppBar from "./NavBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("token") ? true : false || false
  );

  const loginHandler = () => {
    setLogin(true);
  };

  // const logoutHandler = () => {
  //   localStorage.removeItem("token");
  //   setLogin(false);
  // };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <ResponsiveAppBar
          login={login}
          logouthandler={() => {
            localStorage.removeItem("token");
            setLogin(false);
          }}
          loginHandler={loginHandler}
        />
        <Routes>
          <Route exact path="/" element={<Login login={loginHandler} />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/expense" element={<AddExpense />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
