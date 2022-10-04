import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";


const theme = createTheme();
const id = '123';
const obj = [
  {
    categoryId: '1',
    categoryName: 'meat'
  },
  {
    categoryId: '2',
    categoryName: 'vegetable'
  },
  {
    categoryId: '3',
    categoryName: 'drink'
  },
]

const CustomerBill: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{height:'100vh', display:'flex', flexDirection:'row'}}>
      <NavBar role='bill'  />
      <div>CustomerBill page</div>
      </Box>

      
    </ThemeProvider>
  );
};

export default CustomerBill;