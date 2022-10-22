import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DishCard from "../stories/customer/dishCard/DishCard";
import OrderDetailBOx from "../stories/customer/orderDetailBox/OrderDetailBox";
import PreNextButton from "../stories/kitchen/PreNextButton";
import StatusMenu from "../stories/kitchen/StatusMenu";
import PageButton from "../stories/kitchen/PageButton";
import NavBar from "../stories/NavBar";
import { getKitchenOrder, postKitchenOrder } from "../api/kitchen";

const theme = createTheme();

interface orderInterface {
  orderList: {
    orderId: number;
    orderTime: string;
    status: string;
    table: number;
    waitCount: number;
  }[]
}


const Kitchen: React.FC<{}> = () => {

  const navigate = useNavigate();

  const [status, setStatus] = useState('All Status');
  const [orderList, setOrderList] = useState<orderInterface>();
  const [page, setPage] = useState(1);


  useEffect(() => {
    getOrder(status);
    const timer = setInterval(() => getOrder(status), 3000);
    return () => clearInterval(timer);
  }, [status])


  const getOrder = async (e: string) => {
    if (e !== 'All Status') {
      const message = await postKitchenOrder({ orderStatus: e });
      setOrderList(message);
      console.log('message', message);
    } else {
      const message = await getKitchenOrder();
      setOrderList(message);
      console.log('message', message);
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <NavBar role='kitchen' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        <Box sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'start', mt: 10 }}>
            <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', ml: 20 }}>
              Customer Order
            </Typography>
            <Box sx={{ mr: 20 }}>
              <StatusMenu doSomething={setStatus} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', height: '100%', width: '100%', }}>

            <Box>
              {orderList?.orderList.map((item, index) => {
                return (
                  <Box key={item.orderId}>{JSON.stringify(item)}</Box>
                )
              })}
            </Box>

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'end', mb: 10, width: '100%', justifyContent: 'right' }}>
            <Box sx={{ mr: 20 }}>
              <PageButton doSomething={setPage} numberOfPage={5} />
            </Box>



          </Box>







        </Box>

      </Box>





    </ThemeProvider>
  );
};

export default Kitchen;