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
import { getWaitItem, getWaitOrder, getWaitRequest } from "../api/wait";


const theme = createTheme();

interface orderInterface {
  orderId: number;
  isRequest: number;
}

const Waiter: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState('request');
  const [numOfRequest, setNumOfRequest] = useState(0)
  const [numOfItem, setNumOfItem] = useState(0)
  const [numOfOrder, setNumOfOrder] = useState(0)
  const [order, setOrder] = useState({}[])

  const getRequest = async () => {
    const message = await getWaitRequest();
    setNumOfRequest(message.requestsList.length);
    // console.log(message.requestsList);
  };

  const getItem = async () => {
    const message = await getWaitItem();
    setNumOfItem(message.itemsList.length);
    // console.log(message.itemsList);
  };

  const getOrder = async () => {
    const message = await getWaitOrder();
    setNumOfOrder(message.orderList.length);
    console.log(message.orderList);
  };

  const getAll = () => {
    getRequest();
    getItem();
    getOrder();
  }
  useEffect(() => {
    const timer = setInterval(getAll, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
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

        {show === 'request' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfRequest(numOfRequest - 1)}
            >-1</Button>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfRequest(numOfRequest + 1)}
            >+1</Button>
          </Box>
        )}

        {show === 'item' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfItem(numOfItem - 1)}
            >-1</Button>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfItem(numOfItem + 1)}
            >+1</Button>
          </Box>
        )}

        {show === 'order' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} sx={{ display: 'flex', height: '100%', width: '100%' }}>

              {menu.map((item: any) => {

                return (
                  <Grid item xs={'auto'} key={item.dishId}>
                    <DishCard
                      dishId={item.dishId}
                      dishName={item.title}
                      description={item.description}
                      ingredients={item.ingredient}
                      calories={item.calorie}
                      price={item.cost}
                      picture={item.picture}
                      initDishNum={item.dishNumber}
                      passObj={setNewEdit}
                    />

                  </Grid>
                )
              })}



            </Grid>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Waiter;