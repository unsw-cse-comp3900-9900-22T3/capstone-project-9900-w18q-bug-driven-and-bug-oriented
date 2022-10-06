import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import OrderBar from "../stories/customer/orderBar/OrderBar";
import { getCustomerInit } from "../api/customer";


const theme = createTheme();

const obj = [
  {
    category_id: '1',
    category_name: 'meat'
  },
  {
    category_id: '2',
    category_name: 'vegetable'
  },
  {
    category_id: '3',
    category_name: 'drink'
  },
]

const haveOrder = [
  {
    dishId: '1',
    dishName: 'meat',
    calorie: 50,
    price: 10,
    number: 1,
  },
  {
    dishId: '2',
    dishName: 'vegetable',
    calorie: 40,
    price: 5,
    number: 1,
  },
  {
    dishId: '3',
    dishName: 'rice',
    calorie: 48,
    price: 3,
    number: 1,
  },
]

const nextOrder =
{
  dishId: '1',
  dishName: 'meat',
  calorie: 50,
  price: 10,
  number: 1,
}

const nextOrder1 =
{
  dishId: '5',
  dishName: 'meat',
  calorie: 40,
  price: 5,
  number: 1,
}


const person = 3;

const Customer: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');  
  const [nav, setNav] = useState<any>([]);

  const [oldOrder, setOldOrder] = useState<any>([]);

  const [newOrder, setNewOrder] = useState<any>([]);
  const [totalOrder, setTotalOrder] = useState<any>([]);
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [price, setPrice] = useState(0);
  const [countOfCal, setCountOfCal] = useState(0);
  const [ceilingOfCal, setCeilingOfCal] = useState(500 * person);

  //读取老订单
  useEffect(() => {
    // const order = haveOrder;
    // setOldOrder(order);
    // set id 
    const arr = location.pathname.split('/');
    setId(arr[2]);
    getInit(arr[2]);
  }, [])

  const getInit = async (e:any) => {
    const message = await getCustomerInit(e);
    console.log('message', message);
    setNav(message.categoryList);

  };

  // 增加item
  const addItem = (input:
    {
      dishId: string;
      dishName: string;
      calorie: number;
      price: number;
      number: number;
    }) => {
    const order = [...newOrder];
    console.log('herehhhhhhh', input);
    let flag = true;
    let index = 0;
    let i = 0;
    order.map((element) => {
      if (element.dishId === input.dishId) {
        i = index;
        flag = false;
      }
      index += 1;
    });
    if (flag) {
      order.push(input);
    } else {
      order[i].number += 1;
    }
    setNewOrder(order);
    setNumberOfItem(numberOfItem + 1);
  };


  // 减少item
  const removeItem = (input:
    {
      dishId: string;
      dishName: string;
      calorie: number;
      price: number;
      number: number;
    }) => {
    const order = [...newOrder];
    let flag = false;
    let index = 0;
    let i = -1;
    order.map((element) => {
      if (element.dishId === input.dishId) {
        i = index;
        if (element.number <= 1) {
          flag = true;
        }
      }
      index += 1;
    });
    if (flag) {
      order?.splice(i, 1);
      setNumberOfItem(numberOfItem - 1);
    } else if (i > -1) {
      order[i].number -= 1;
      setNumberOfItem(numberOfItem - 1);
    }
    setNewOrder(order);

  };

  // 提交订单函数
  const confirmSubmit = (e: any) => {
    setNumberOfItem(0);
  };

  // 更新总订单
  useEffect(() => {
    const order = [...oldOrder, ...newOrder];
    setTotalOrder(order);
    // console.log('totalOrder', totalOrder);
    console.log('new order', newOrder);
  }, [newOrder, oldOrder])



  useEffect(() => {
    console.log('totalOrder', totalOrder);
    let tempPrice = 0;
    let tempCal = 0;
    totalOrder.map((e: {
      dishId: string;
      dishName: string;
      calorie: number;
      price: number;
      number: number;
    }) => {
      tempPrice = tempPrice + e.price * e.number;
      tempCal = tempCal + e.calorie * e.number;
    });
    setPrice(tempPrice);
    setCountOfCal(tempCal);

  }, [totalOrder])


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='customer' id={id} obj={nav} />
        </Box>

        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }} >
            <Button sx={{ height: 30 }} onClick={() => navigate(`/customer/${id}/bill`)} variant="contained"> to the bill</Button>
            <Button onClick={() => setOldOrder(haveOrder)} sx={{ height: 30 }}> set old order</Button>
            <Button variant="contained" onClick={() => addItem(nextOrder)} sx={{ height: 30 }}> add item</Button>
            <Button variant="contained" onClick={() => addItem(nextOrder1)} sx={{ height: 30 }}> add item</Button>
            <Button onClick={() => removeItem(nextOrder)} sx={{ height: 30 }}> remove item</Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'end', width: '100%' }}>

            <OrderBar
              haveItem={(numberOfItem >= 1 || oldOrder.length !== 0) ? true : false}
              canSubmit={(numberOfItem >= 1) ? true : false}
              number={numberOfItem}
              price={price}
              ceilingOfCal={ceilingOfCal}
              countOfCal={countOfCal}
              submitFunc={() => confirmSubmit(newOrder)} />


          </Box>
        </Box>
      </Box>


    </ThemeProvider>
  );
};

export default Customer;