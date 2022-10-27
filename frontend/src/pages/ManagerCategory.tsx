import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import AddManagerCategory from "../stories/manager/managerCategoryCard/AddManagerCategory";


const theme = createTheme();

const ManagerCategory: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={()=>{}} postRequest={() => { }} />
        </Box>
        
        
        <Box sx={{height:'100vh', width:'100%', display:'flex'}}>
          <Box sx={{alignItems:'end' ,justifyContent:'right', height:200, width:'100%', display:'flex'}}>
            <AddManagerCategory/>
          </Box>

        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerCategory;