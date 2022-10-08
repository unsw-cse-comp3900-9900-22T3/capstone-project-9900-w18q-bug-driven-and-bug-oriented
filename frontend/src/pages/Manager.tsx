import React, { useState, useEffect, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visualization from "./dashboard.js";


const theme = createTheme();

const Manager: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div>Manager page</div>
      <Visualization/>
    </ThemeProvider>
  );
};

export default Manager;