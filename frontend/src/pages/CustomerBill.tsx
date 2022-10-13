import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  Divider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import { getCustomerBill } from "../api/customer";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import OrderDetailBox from "../stories/customer/orderDetailBox/OrderDetailBox";

const theme = createTheme();
const id = '123';
const obj = [
  {
    categoryId: '1',
    categoryName: 'meat'
  },
  {
    categoryId: '2',
    categoryName: 'vegetable'
  },
  {
    categoryId: '3',
    categoryName: 'drink'
  },
]

const CustomerBill: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [bill, setBill] = useState<any>();
  const [price, setPrice] = useState(0);


  const getInit = async (e: any) => {
    const message = await getCustomerBill(e);
    console.log('message', message);
    setBill(message.itemList);
    let cost = 0;
    message.itemList.map((item: { cost: number; dishNumber: number; }) => {
      cost = cost + item.cost * item.dishNumber;
    });
    setPrice(cost);
  };

  useEffect(() => {
    const arr = location.pathname.split('/');
    getInit(arr[2]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='bill' doSomething={() => { }} postRequest={() => { }} />
        </Box>


        <Box sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', m: 10, flexDirection: 'column', width:'100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
              <Typography sx={{ p: 2, fontWeight: 'bold' }} variant='h3'>
                Your Order
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', overflow: "auto",width:'100%' }}>
              {bill?.map((item: any, index: number) => {
                return (
                  <>
                    <OrderDetailBox
                      dishId={item.dishId}
                      dishName={item.title}
                      price={item.cost}
                      calories={item.calorie}
                      picture={item.picture}
                      status='bill'
                      initDishNum={item.dishNumber}
                    />
                    {/* <div>{JSON.stringify(item)}</div> */}
                    {(index !== bill.length - 1) && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </>
                )
              })}
              <Divider sx={{
                mt: 5, backgroundColor: '#000000',
                mx: 5, mb: 3
              }}>
              </Divider>
              <Typography variant="h6" sx={{ display: 'flex', color: '#626264' }} >
                Thanks for your coming! Please go to the front counter to pay. <SentimentSatisfiedAltIcon sx={{ m: 0.7, color: '#FB6D3A' }} />
              </Typography>
              <Typography variant="h4" sx={{ display: 'flex', color: '#626264', justifyContent: 'right', m: 3 }} >
                Total:
                <Box sx={{ display: 'flex', ml: 2 }} >
                  <Typography variant="h5" sx={{ display: 'flex', color: '#000000', mt: 1 }} >
                    $
                  </Typography>
                  <Typography variant="h3" sx={{ display: 'flex', color: '#000000', mt: -1 }} >
                    {Number(price.toFixed(2))}
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </Box>


        </Box>
      </Box>

    </ThemeProvider>
  );
};

export default CustomerBill;