import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import NavButton from "../stories/NavButton";
import Logout from "../stories/Logout";
import { getWaitItem, getWaitOrder, getWaitRequest, postWaitItem, postWaitOrder, postWaitRequest } from "../api/wait";
import OrderCard from "../stories/wait/OrderCard";
import WaitItemBox from "../stories/wait/WaitItemBox";
import WaitRequestBox from "../stories/wait/WaitRequestBox";


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

interface itemInterface {
  itemsList: {
    itemIndex?: number;
    table?: number;
    itemTime?: string;
    dishName?: string;
  }[]
};

interface requestInterface {
  requestsList: {
    id?: number;
    table?: number;
    startTime?: string;
  }[]
};

const Waiter: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState('request');
  const [numOfRequest, setNumOfRequest] = useState(0);
  const [numOfItem, setNumOfItem] = useState(0);
  const [numOfOrder, setNumOfOrder] = useState(0);
  const [items, setItem] = useState<(itemInterface | any)>();
  const [order, setOrder] = useState<orderInterface | any>();
  const [request, setRequest] = useState<requestInterface | any>();

  const getRequest = async () => {
    const message = await getWaitRequest();
    setNumOfRequest(message.requestsList.length);
    setRequest(message);
    // console.log(message.requestsList);
  };

  const getItem = async () => {
    const message = await getWaitItem();
    setNumOfItem(message.itemsList.length);
    setItem(message);
    console.log(message);
  };

  const getOrder = async () => {
    const message = await getWaitOrder();
    setNumOfOrder(message.orderList.length);
    setOrder(message);
    // console.log(order);
    // console.log(message.orderList);
  };

  const getAll = () => {
    getRequest();
    getItem();
    getOrder();
  }

  const postOrder = async (id: number) => {
    const message = await postWaitOrder(id.toString());
    console.log('confirm order', message);
    setNumOfOrder(numOfOrder - 1);
    const newOrder = {...order};
    newOrder?.orderList?.map((item: { orderId: number; },index: any)=>{
      if (item.orderId === id){
        newOrder?.orderList?.splice(index,1);
      }
    })
    setOrder(newOrder);
    // console.log(message.orderList);
  };

  const postItem = async (id: number) => {
    const message = await postWaitItem(id.toString());
    setNumOfItem(numOfItem - 1);
    const newItems = { ...items };
    // let index = 0
    newItems?.itemsList?.map((item: { itemIndex: number; }, index: number) => {
      if (item.itemIndex === id) {
        newItems?.itemsList?.splice(index, 1);
      }
    })
    setItem(newItems);

    console.log('confirm item', message);
    // console.log(message.orderList);
  };

  const postRequest = async (id: number) => {
    const message = await postWaitRequest(id.toString());
    console.log('confirm request', message);
    setNumOfRequest(numOfRequest - 1);
    const newRequest = {...request};
    newRequest?.requestsList?.map((item: { id: number; },index: any)=>{
      if (item.id ===id){
        newRequest?.requestsList?.splice(index, 1);
      }
    })
    setRequest(newRequest);
    // console.log(message.orderList);
  };


  useEffect(() => {
    const timer = setInterval(getAll, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getAll()
  }, []);



  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
              Wait Staff
            </Typography>
            <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {show !== 'request' && (
                <NavButton item='request' selected={false} doSomething={() => setShow('request')} number={numOfRequest} />
              )}
              {show === 'request' && (
                <NavButton item='request' selected number={numOfRequest} />
              )}

              {show !== 'item' && (
                <NavButton item='item' selected={false} doSomething={() => setShow('item')} number={numOfItem} />
              )}
              {show === 'item' && (
                <NavButton item='item' selected number={numOfItem} />
              )}

              {show !== 'order' && (
                <NavButton item='order' selected={false} doSomething={() => setShow('order')} number={numOfOrder} />
              )}
              {show === 'order' && (
                <NavButton item='order' selected number={numOfOrder} />
              )}
            </Box>
            <Box sx={{ display: 'flex', height: '100%', }}></Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 5 }}>
              <Logout status="logout" />
            </Box>

          </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 50px)', width: '100%' }}>
          {show === 'request' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
              <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >

                {request?.requestsList.map((item: any) => {
                  // if (item.orderTime)
                  return (
                    <Grid item xs={'auto'} key={'request' + item.id} >
                      <WaitRequestBox
                        doSomething={() => postRequest(item.id)}
                        requestId={item.id}
                        table={item.table}
                        startTime={item.startTime}
                      // nowTime={new Date()}
                      />

                    </Grid>
                  )
                })}



              </Grid>
            </Box>
          )}

          {show === 'item' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
              <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >

                {items?.itemsList.map((item: any) => {
                  // if (item.orderTime)
                  return (
                    <Grid item xs={'auto'} key={'item' + item.itemIndex} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <WaitItemBox
                        doSomething={() => postItem(item.itemIndex)}
                        itemIndex={item.itemIndex}
                        table={item.table}
                        dishName={item.dishName}
                      />

                    </Grid>
                  )
                })}



              </Grid>
            </Box>
          )}

          {show === 'order' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
              <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >

                {order?.orderList.map((item: any) => {
                  // if (item.orderTime)
                  return (
                    <Grid item xs={'auto'} key={'order' + item.orderId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <OrderCard
                        confirmFunc={() => postOrder(item.orderId)}
                        orderId={item.orderId}
                        table={item.table}
                        time={item.orderTime ? item.orderTime : '2000-00-00-00:00:00'}
                        isRequest={item.isRequest}
                        price={item.price}
                        itemList={item.itemList}
                      />

                    </Grid>
                  )
                })}



              </Grid>
            </Box>
          )}
        </Box>

      </Box>
    </ThemeProvider>
  );
};

export default Waiter;