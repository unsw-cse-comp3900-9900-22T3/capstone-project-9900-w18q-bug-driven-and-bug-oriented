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

  const [dishInfo1, setDishInfo1] = React.useState<any>({});
  const [dishInfo2, setDishInfo2] = React.useState<any>({});


  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>

    </ThemeProvider>
  );
};

export default Kitchen;