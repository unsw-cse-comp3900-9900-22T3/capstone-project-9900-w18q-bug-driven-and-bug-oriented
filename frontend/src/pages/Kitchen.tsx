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
import PageButton from "../stories/kitchen/PageButton";

const theme = createTheme();

const Kitchen: React.FC<{}> = () => {

  const navigate = useNavigate();

  const [status, setStatus] = useState('All Status');
  const [page, setPage] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      </Box>
      <PreNextButton type={'0'} />
      <PreNextButton type={'1'} />
      <StatusMenu doSomething={setStatus} />
      {status}
      <Box>
        <PageButton doSomething={setPage} numberOfPage={5} />
      </Box>
      <div>
        {page}
      </div>

    </ThemeProvider>
  );
};

export default Kitchen;