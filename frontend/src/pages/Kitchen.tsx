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
import PreNextButton from "../stories/kitchen/PreNextButton";
import StatusMenu from "../stories/kitchen/StatusMenu";

const theme = createTheme();

const Kitchen: React.FC<{}> = () => {

  const navigate = useNavigate();

  const [status, setStatus] = useState('All Status');
  

  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      </Box>
      <PreNextButton type={'0'} />
      <PreNextButton type={'1'} />
      <StatusMenu doSomething={setStatus}/>
      {status}

    </ThemeProvider>
  );
};

export default Kitchen;