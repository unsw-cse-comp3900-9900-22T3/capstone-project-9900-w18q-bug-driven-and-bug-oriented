import React, { useState, useEffect, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Customer: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div>Customer page</div>
      
    </ThemeProvider>
  );
};

export default Customer;