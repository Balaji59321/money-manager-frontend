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
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import History from "./components/History";
import ResponsiveAppBar from "./NavBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("token") ? true : false || false
  );

  const loginHandler = () => {
    setLogin(true);
  };

  return (
    <BrowserRouter>
      <ResponsiveAppBar login={login} />
      <Routes>
        <Route exact path="/" element={<Login login={loginHandler} />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/expense" element={<AddExpense />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
