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
import WaitItemBox from "../stories/wait/WaitItemBox";
import WaitRequestBox from "../stories/wait/WaitRequestBox";

const theme = createTheme();

const Kitchen: React.FC<{}> = () => {

  const navigate = useNavigate();

  const [dishInfo1, setDishInfo1] = React.useState<any>({});
  const [dishInfo2, setDishInfo2] = React.useState<any>({});
  const [dishInfo3, setDishInfo3] = React.useState<any>({});
  const [dishInfo4, setDishInfo4] = React.useState<any>({});


  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      
      <WaitItemBox doSomething={() => {}}/>

      <WaitRequestBox doSomething={() => {}}/>

    </ThemeProvider>
  );
};

export default Kitchen;