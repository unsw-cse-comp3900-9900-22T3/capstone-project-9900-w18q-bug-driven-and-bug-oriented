import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DishCard from "../stories/customer/dishCard/DishCard";
import OrderDetailBOx from "../stories/customer/orderDetailBox/OrderDetailBox";
import PreNextButton from "../stories/kitchen/PreNextButton";
import StatusMenu from "../stories/kitchen/StatusMenu";
import PageButton from "../stories/kitchen/PageButton";
import OrderRecord from "../stories/kitchen/OrderRecord";
import NavBar from "../stories/NavBar";
import { getKitchenOrder, postKitchenOrder } from "../api/kitchen";
import { parse } from "querystring";
import { minHeight } from "@mui/system";

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
  const [orderList, setOrderList] = useState<orderInterface | any>();
  const [pageOrder, setPageOrder] = useState<orderInterface | any>();
  const [numPage, setNumPage] = useState(1);
  const [page, setPage] = useState(1);


  useEffect(() => {
    getOrder(status);
    setPage(1);
    const timer = setInterval(() => getOrder(status), 3000);
    return () => clearInterval(timer);
  }, [status])

  useEffect(() => {
    if (orderList) {
      const num = Math.ceil(orderList ? orderList?.orderList.length / 10 : 1);
      setNumPage(num);

      const newOrder = { orderList: [...orderList?.orderList.slice((page - 1) * 10, (page - 1) * 10 + 10)] };
      console.log(orderList);
      console.log(newOrder);
      setPageOrder(newOrder);
    }

  }, [orderList, page])


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

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'start', mt: 20, mb: 10, height:300 }}>
            <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', ml: 20 }}>
              Customer Order
            </Typography>
            <Box sx={{ mr: 20 }}>
              <StatusMenu doSomething={setStatus} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', height: 'calc(100vh - 400px)', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <Box sx={{ display:'flex', m: 20, height: 800, width: '100%', flexDirection:'column' }}>
              <Grid container spacing={1} >
                <Grid item xs={3}>
                  <Typography variant="h6">Table</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">Order time</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">Number of wait items</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">Status</Typography>
                </Grid>
                <Grid item xs={1}>

                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Box sx={{height:'100%', width:'100%'}}>
                {pageOrder?.orderList.map((item: { orderId: React.Key | null | undefined; table: Number | undefined; orderTime: string | undefined; status: string | undefined; waitCount: Number | undefined; }) => {
                  return (
                    // <Box key={item.orderId}>{JSON.stringify(item)}</Box>
                    <Box key={item.orderId} sx={{ my: 4 }}>
                      <OrderRecord table={item.table} orderTime={item.orderTime} status={item.status} waitCount={item.waitCount} doSomething={()=>navigate(`/kitchen/${item.orderId}`)} />
                    </Box>

                  )
                })}
                {!pageOrder && (
                 <Grid item xs={12} sx={{display:'flex', justifyContent:'center',alignItems:'center', mt:50}}>
                 <Typography variant="h3">
                   Upcoming......
                   </Typography>
                 </Grid>
              )
              }
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ height: 200, display: 'flex', alignItems: 'end', mb: 20, width: '100%', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ml:15, height:55}} >Showing {pageOrder?.orderList.length} from {orderList?.orderList.length} data</Typography>
            <Box sx={{ mr: 20 }}>
              <PageButton doSomething={setPage} numberOfPage={numPage} nowPage={page} />
            </Box>

          </Box>

        </Box>
      </Box>

    </ThemeProvider>
  );
};

export default Kitchen;