import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";


const theme = createTheme();

const ManagerKey: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <NavBar role='manager' />
        
        <div>ManagerKey page</div>
      </Box>
      
    </ThemeProvider>
  );
};

export default ManagerKey;