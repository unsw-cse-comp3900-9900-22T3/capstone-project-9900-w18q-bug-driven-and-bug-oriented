import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DishCard from "../stories/customer/dishCard/DishCard";
import OrderDetailBOx from "../stories/customer/orderDetailBox/OrderDetailBox";

const theme = createTheme();

const Kitchen: React.FC<{}> = () => {

  const navigate = useNavigate();

  const [dishInfo1, setDishInfo1] = React.useState<any>({});
  const [dishInfo2, setDishInfo2] = React.useState<any>({});


  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      </Box>

      <OrderDetailBOx passObj = {setDishInfo1}/>
      <Box> {JSON.stringify(dishInfo1)} </Box>

      <OrderDetailBOx passObj = {setDishInfo2}/>
      <Box> {JSON.stringify(dishInfo2)}  </Box>

    </ThemeProvider>
  );
};

export default Kitchen;