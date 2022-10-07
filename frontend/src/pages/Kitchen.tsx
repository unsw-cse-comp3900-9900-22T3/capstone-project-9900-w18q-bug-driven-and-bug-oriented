import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DishCard from "../stories/customer/dishCard/DishCard";

const theme = createTheme();

const Kitchen: React.FC<{}> = () => {
  const navigate = useNavigate();

  const [dishNum1, setDishNum1] = React.useState(0);
  const [dishNum2, setDishNum2] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      <Button onClick={()=>navigate("/kitchen/123")}>order</Button>
      <DishCard initDishNum={dishNum1} passDishNum={setDishNum1}/>
      <div>Dish number: {dishNum1}</div>
      <DishCard initDishNum={dishNum2} passDishNum={setDishNum2}/>
      <div>Dish number: {dishNum2}</div>
    </ThemeProvider>
  );
};

export default Kitchen;