import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import { getWaitOrder } from "../api/wait";
import ManagerOrderCard from "../stories/manager/managerOrderCard/ManagerOrderCard";


const theme = createTheme();

interface orderInterface {
  orderList: {
    orderId?: number;
    isRequest?: number;
    table?: number;
    time?: string;
    price?: number;
    itemList?: [
      {
        dishName?: string;
        price?: number;
        status?: string;
      }]
  }[]
};

const ManagerOrder: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<orderInterface | any>()

  const getOrder = async () => {
    const message = await getWaitOrder();
    setOrder(message);
    console.log(message);
    // console.log(message.orderList);
  };

  useEffect(() => {
    getOrder();
  }, []); 

  useEffect(() => {
    const timer = setInterval(getOrder, 5000);
    return () => clearInterval(timer);
  }, []);




  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        <Box sx={{ display:'flex',flexGrow:1, justifyContent: 'center', alignItems: 'center', mt: 10, flexDirection:'column' }}>
          <Box sx={{display:'flex', width:'100%', }}>
            <Typography sx={{ m: 5, ml: 15 }} variant='h3'>
              Now order:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', overflow: "auto", ml: 15, flexGrow:1}}>

            <Grid container alignItems='flex-start' justifyContent="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >

              {order?.orderList.map((item: any) => {
                // if (item.orderTime)
                return (
                  <Grid item xs={'auto'} key={'order' + item.orderId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ManagerOrderCard
                      orderId={item.orderId}
                      table={item.table}
                      time={item.orderTime ? item.orderTime : '2000-00-00-00:00:00'}
                      price={item.price}
                      itemList={item.itemList}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerOrder;