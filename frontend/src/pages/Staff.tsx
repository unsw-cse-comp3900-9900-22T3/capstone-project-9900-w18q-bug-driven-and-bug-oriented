import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Staff: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div>Staff page</div>
    </ThemeProvider>
  );
};

export default Staff;